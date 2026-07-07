"use client";
import React, { useState } from "react";
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

function TaskForm({ isDialogOpen, setIsDialogOpen }) {
  const [date, setDate] = useState();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")


  const handleSubmit = (event)=>{
    event.preventDefault()
    const formData = {
      title,
      description,
      date,
      priority
    }

    console.log(formData)
    setIsDialogOpen(false)
  }
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <form onSubmit={handleSubmit}>
        {/* <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} /> */}
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add New task</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title-1">Title</Label>
              <Input id="title-1" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} />
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
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
                rows={10}
                value={description} 
                onChange={(e)=> setDescription(e.target.value)}
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
            <Button type="submit">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default TaskForm;
