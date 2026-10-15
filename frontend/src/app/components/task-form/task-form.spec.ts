import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { TaskForm } from './task-form';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm],
      providers: [
        provideRouter([]),
        {
          provide: TaskService,
          useValue: {
            createTask: () => of({ id: 1, title: 'Test', description: '', completed: false }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
