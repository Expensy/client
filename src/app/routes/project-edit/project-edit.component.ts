import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project';
import { AuthService } from '../../services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  isLoading: boolean;
  project: Project;
  categories: Category[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private categoryService: CategoryService,
              private authService: AuthService,
              private modalService: NgbModal) {
    this.project = this.route.snapshot.data['project'];
  }

  ngOnInit() {
    this.isLoading = false;

    this.categoryService.list(this.project.id)
      .subscribe((response) => {
        console.log('resp', response);
        this.categories = response.items;
      });
  }

  submitForm(formValues) {
    this.isLoading = true;

    this.projectService.update(this.project.id, formValues)
      .finally(() => this.isLoading = false)
      .subscribe((project) => {
          const user = this.authService.user.getValue();
          user.projects.push(project);
          this.authService.user.next(user);
          this.router.navigate(['/projects', project.id, 'entries']);
        },
        (err: HttpErrorResponse) => {
          // TODO show errors
          console.error(err);
        });
  }

  deleteProject(content) {
    this.modalService.open(content).result
      .then((result) => {
        this.projectService.remove(this.project.id)
          .subscribe(() => {
              const user = this.authService.user.getValue();
              user.projects = user.projects.filter((project) => project.id !== this.project.id);
              this.authService.user.next(user);
              this.router.navigate(['/projects', user.projects[0].id, 'entries']);
            },
            (err: HttpErrorResponse) => {
              // TODO show errors
              console.error(err);
            });
      }, (reason) => {
        console.log('modal dismissed', reason);
      });
  }
}
