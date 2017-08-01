import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  isLoading: boolean;
  project: Project;
  private projectId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) {
    this.projectId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.isLoading = false;

    this.projectService.show(this.projectId)
      .subscribe((project) => this.project = project);
  }

  submitForm(formValues) {
    this.isLoading = true;

    this.projectService.update(this.projectId, formValues)
      .finally(() => this.isLoading = false)
      .subscribe(() => {
          this.router.navigate(['/projects']);
        },
        (err: HttpErrorResponse) => {
          // TODO show errors
          console.error(err);
        });
  }
}
