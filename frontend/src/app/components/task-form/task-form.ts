import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  task: Task = {
    title: '',
    description: '',
    completed: false,
  };
  errorMessage = '';
  submitting = false;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  saveTask(): void {
    if (!this.task.title.trim()) {
      this.errorMessage = 'Title is required.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.taskService.createTask(this.task).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: unknown) => {
        this.submitting = false;
        this.errorMessage = 'Failed to create task. Please try again later.';
        console.error('Error creating task:', error);
      },
    });
  }
}
