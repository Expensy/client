import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../models/entry';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-project-feed',
  templateUrl: './project-feed.component.html',
  styleUrls: ['./project-feed.component.scss']
})
export class ProjectFeedComponent implements OnInit {
  categories: Category[];
  entries: Entry[];
  isLoading: boolean;
  project: Project;
  projectId: number;

  constructor(private route: ActivatedRoute, private entryService: EntryService, private categoryService: CategoryService) {}

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

    this.categoryService.list(this.projectId)
      .finally(() => this.isLoading = false)
      .subscribe((response) => {
        this.categories = response.items;
      });
  }

  deleteEntry(id: number) {
    this.entryService.remove(id)
      .subscribe(() => {
        this.entries = this.entries.filter((entry) => entry.id !== id);
      });
  }
}
