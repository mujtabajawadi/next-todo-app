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
export async function PATCH(req) {
  const id = req.nextUrl.searchParams.get("id");
  const updatedFields = await req.json();
  console.log(id);
  try {
    await connectDatabase();
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      {
        $set: updatedFields,
      },
      {
        new: true,
      },
    );

    if (!updatedTask) {
      return NextResponse.json(
        { error: "Failed to update task" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Task Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  console.log(id);
  try {
    await connectDatabase();
    const deletedTask = await Task.findOneAndDelete({ _id: id });

    if (!deletedTask) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    console.log(deletedTask);
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
