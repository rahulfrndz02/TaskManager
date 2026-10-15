import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add', component: TaskForm },
  { path: '**', redirectTo: '' },
];
