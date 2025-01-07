import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

@Injectable({providedIn: 'root'})
export class TasksService{
    private tasks = signal<Task []>([]);

    allTasks = this.tasks.asReadonly();

    addTask(newData: {title: string, description: string}){
        const newTask: Task = {
            ...newData,
            id: Math.random().toString(),
            status: 'OPEN'
        }

        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    }

    updateTaskStatus(taskId: string, taskStatus: TaskStatus){
        this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? {...task, status: taskStatus} : task));
    }
}