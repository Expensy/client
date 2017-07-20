import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../models/entry';

@Component({
  selector: 'app-project-feed',
  templateUrl: './project-feed.component.html',
  styleUrls: ['./project-feed.component.scss']
})
export class ProjectFeedComponent implements OnInit {
  entries: Entry[];
  isLoading: boolean;
  project: Project;
  projectId: number;

  constructor(private route: ActivatedRoute, private entryService: EntryService) {}

  ngOnInit() {
    this.project = this.route.snapshot.data['feed'];
    this.projectId = +this.route.snapshot.params['projectId'];

    this.entries = [];

    this.loadMore();
  }

  loadMore() {
    this.isLoading = true;

    this.entryService.list(this.projectId)
      .finally(() => this.isLoading = false)
      .subscribe((response) => {
        this.entries = response.items;
      });
  }
}
