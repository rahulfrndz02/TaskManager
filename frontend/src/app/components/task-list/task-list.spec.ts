import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { TaskListComponent } from './task-list';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: () => of([]),
            updateTask: () => of({ id: 1, title: 'Test', description: '', completed: true }),
            deleteTask: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
