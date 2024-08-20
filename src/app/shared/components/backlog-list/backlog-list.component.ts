import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../services/backlog.service';
import { Backlog } from '../../models/backlog.model';

@Component({
  selector: 'app-backlog-list',
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss']
})
export class BacklogListComponent implements OnInit {
  backlogs: Backlog[] = [];

  constructor(private backlogService: BacklogService) { }

  ngOnInit(): void {
    this.backlogService.getBacklogs().subscribe((data) => {
      this.backlogs = data;
    });
  }
}
