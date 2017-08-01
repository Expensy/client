import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  isLoading: boolean;
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectService.list()
      .finally(() => this.isLoading = false)
      .subscribe((response) => {
        this.projects = response.items;
      });
  }

  deleteProject(id: number) {
    this.projectService.remove(id)
      .subscribe(() => {
        this.projects = this.projects.filter((project) => project.id !== id);
      });
  }
}
