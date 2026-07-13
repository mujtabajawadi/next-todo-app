import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Task from "@/models/Tasks.model.js";
import Notification from "@/models/Notifications.model.js";
import { connectDatabase } from "@/lib/dbConnection.js";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const decodedToken = await getToken({ req });
    if (!decodedToken) {
      return NextResponse.json({ error: "Login required" }, { status: 403 });
    }

    const userId = new mongoose.Types.ObjectId(decodedToken.id);

    const now = new Date();
    const startOfToday = new Date(now.setUTCHours(0, 0, 0, 0));
    const endOfToday = new Date(now.setUTCHours(23, 59, 59, 999));

    const query = {
      createdBy: userId,
      priority: "extreme",
      deadline: { $gte: startOfToday, $lte: endOfToday },
      isCompleted: false,
    };

    await connectDatabase();
    const urgentTasks = await Task.find(query);

    let createdCount = 0;

    for (const task of urgentTasks) {
      try {
        const alreadyExists = await Notification.findOne({
          taskId: task._id,
          userId,
        });
        if (!alreadyExists) {
          await Notification.create({
            taskId: task._id,
            userId,
            isRead: false,
          });
          createdCount++;
        }
      } catch (loopError) {
        return NextResponse.json(
          {
            error: "Failed inside notification generation loop",
            details: loopError.message,
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Scanned tasks. Generated ${createdCount} new notifications.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Global server error", details: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await connectDatabase();

    const decodedToken = await getToken({ req });
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Login required for this action" },
        { status: 403 },
      );
    }

    const userId = decodedToken.id;

    const activeNotifications = await Notification.find({
      userId,
      isRead: false,
    }).populate({
      path: "taskId",
      select: "title dueDate priority",
    });

    return NextResponse.json({ success: true, data: activeNotifications });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDatabase();

    const decodedToken = await getToken({ req });
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Login required for this action" },
        { status: 403 },
      );
    }

    const userId = decodedToken.id;
    const { notificationId } = await req.json();

    if (!notificationId) {
      return NextResponse.json(
        { error: "Notification ID is required" },
        { status: 400 },
      );
    }

    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true },
    );

    if (!updatedNotification) {
      return NextResponse.json(
        { error: "Notification not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
