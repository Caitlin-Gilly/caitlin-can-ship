"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Workout = {
  id: string
  day: string
  exercise: string
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function WeeklyGymSchedule() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [day, setDay] = useState(daysOfWeek[0])
  const [exercise, setExercise] = useState('')

  const addWorkout = (e: React.FormEvent) => {
    e.preventDefault()
    if (exercise.trim()) {
      const newWorkout: Workout = {
        id: Date.now().toString(),
        day,
        exercise: exercise.trim()
      }
      setWorkouts([...workouts, newWorkout])
      setExercise('')
    }
  }

  const removeWorkout = (id: string) => {
    setWorkouts(workouts.filter(workout => workout.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Gym Schedule</h1>
      
      <form onSubmit={addWorkout} className="mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <Label htmlFor="day">Day</Label>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger id="day">
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="exercise">Exercise</Label>
            <Input
              id="exercise"
              type="text"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="Enter exercise"
              required
            />
          </div>
          <div className="flex items-end">
            <Button type="submit">Add Workout</Button>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daysOfWeek.map((d) => (
          <div key={d} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{d}</h2>
            <ul className="space-y-2">
              {workouts
                .filter((workout) => workout.day === d)
                .map((workout) => (
                  <li key={workout.id} className="flex justify-between items-center">
                    <span>{workout.exercise}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWorkout(workout.id)}
                      aria-label={`Remove ${workout.exercise}`}
                    >
                      ✕
                    </Button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

