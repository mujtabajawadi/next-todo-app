import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/lib/dbConnection.js";
import Task from "@/models/Tasks.model.js";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    const decodedToken = await getToken({ req });
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Login required for this action" },
        { status: 403 },
      );
    }
    const userId = decodedToken.id;

    const { title, description, priority, status, deadline } = await req.json();

    if (!title || !description || !priority || !status || !deadline) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }
    await connectDatabase();
    await Task.create({
      title,
      description,
      priority,
      status,
      deadline,
      createdBy: userId,
    });

    return NextResponse.json(
      { message: "Task created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    const decodedToken = await getToken({ req });
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Login required for this action" },
        { status: 403 },
      );
    }
    const userId = decodedToken.id;
    await connectDatabase();

    const taskList = await Task.find({ createdBy: userId });
    return NextResponse.json({ taskList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
