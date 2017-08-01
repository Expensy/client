import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {
  isLoading: boolean;

  constructor(private router: Router,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.isLoading = false;
  }

  submitForm(formValues) {
    this.isLoading = true;

    this.projectService.create(formValues)
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
