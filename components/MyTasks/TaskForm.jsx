"use client";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";


function TaskForm({ isDialogOpen, setIsDialogOpen, task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [date, setDate] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("false");

  const router = useRouter()
  

  useEffect(()=>{
    setIsEditing(!!task)
    if(task){
      setTitle(task.title),
      setDescription(task.description),
      setPriority(task.priority),
      setDate(task.deadline),
      setStatus(task.status)
    }else{
      setTitle(""),
      setDescription(""),
      setPriority("low"),
      setDate(""),
      setStatus("false")
    }
  },[task, isDialogOpen])




  const handleSubmit = async (event) => {
    event.preventDefault();


    const url = isEditing? `/api/tasks?id=${task._id}`: "/api/tasks"
    const method = isEditing? "PATCH": "POST"

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          deadline: date,
          status,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add new task.");
      }
      setTitle("");
      setDescription("");
      setPriority("low");
      setDate("");
      setIsDialogOpen(false);
      router.push("/dashboard")
    } catch (error) {
      console.error("Task addition Error: ", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} /> */}
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing?"Edit Task": "Add New Task"}</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title-1">Title</Label>
              <Input
                id="title-1"
                name="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="deadline-1">Date</Label>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={"outline"}
                      data-empty={!date}
                      className="w-63 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {date ? format(date, "P") : <span>Pick a date</span>}
                      <ChevronDownIcon data-icon="inline-end" />
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0" align="start" required>
                  <Calendar
                    mode="single"
                    required
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <Label htmlFor="priority">Priority</Label>
              <RadioGroup
                id="priority"
                defaultValue="option-one"
                className="flex justify-between"
                required
                value={priority}
                onValueChange={setPriority}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="option-one" />
                  <Label htmlFor="option-one">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="option-two" />
                  <Label htmlFor="option-two">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extreme" id="option-three" />
                  <Label htmlFor="option-three">Extreme</Label>
                </div>
              </RadioGroup>
            </Field>
            <Field>
              <Label htmlFor="description-1">Task Description</Label>
              <Textarea
                id="description-1"
                name="description"
                placeholder="Task description goes here..."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              }
            />
            <Button type="submit">{isEditing?"Update":"Done"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskForm;
