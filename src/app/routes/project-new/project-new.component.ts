import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {
  isLoading: boolean;

  constructor(private router: Router,
              private projectService: ProjectService,
              private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = false;
  }

  submitForm(formValues) {
    this.isLoading = true;

    this.projectService.create(formValues)
      .finally(() => this.isLoading = false)
      .subscribe((project) => {
          const user = this.authService.user.getValue();
          user.projects.push(project);
          this.authService.user.next(user);
          this.router.navigate(['projects', project.id, 'entries']);
        },
        (err: HttpErrorResponse) => {
          // TODO show errors
          console.error(err);
        });
  }

}
