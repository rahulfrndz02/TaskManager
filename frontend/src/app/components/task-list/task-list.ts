import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = 'Failed to load tasks. Please try again later.';
        console.error('Error loading tasks:', error);
        this.loading = false;
      },
    });
  }

  toggleCompleted(task: Task): void {
    if (task.id === undefined) {
      return;
    }

    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: (updated: Task) => {
        task.completed = updated.completed;
      },
      error: (error: unknown) => {
        this.errorMessage = 'Failed to update task. Please try again later.';
        console.error('Error updating task:', error);
      },
    });
  }

  deleteTask(task: Task): void {
    if (task.id === undefined) {
      return;
    }

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((item) => item.id !== task.id);
      },
      error: (error: unknown) => {
        this.errorMessage = 'Failed to delete task. Please try again later.';
        console.error('Error deleting task:', error);
      },
    });
  }
}
