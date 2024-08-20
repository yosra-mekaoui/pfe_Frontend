import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTask(id).subscribe((data) => {
        this.task = data;
      });
    }
  }

  deleteTask(): void {
    if (this.task && this.task._id) {
      this.taskService.deleteTask(this.task._id).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
