import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../services/backlog.service';
import { Backlog } from '../../models/backlog.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backlog-detail',
  templateUrl: './backlog-detail.component.html',
  styleUrls: ['./backlog-detail.component.scss']
})
export class BacklogDetailComponent implements OnInit {
  backlog: Backlog | undefined;

  constructor(
    private backlogService: BacklogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.backlogService.getBacklog(id).subscribe((data) => {
        this.backlog = data;
      });
    }
  }
}
