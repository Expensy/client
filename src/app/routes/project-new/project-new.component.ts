import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../components/base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent extends BaseFormComponent implements OnInit {
  isLoading: boolean;
  currencies: any[];

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    super();
  }

  ngOnInit() {
    this.isLoading = false;
    this.errors = {
      title: [
        {
          name: 'required',
          message: 'Please enter a title',
          when: ['dirty']
        },
        {
          name: 'unique_project_name',
          message: 'Please enter a unique project name',
          when: ['dirty']
        }
      ]
    };

    this.currencies = [
      {id: 'EUR', name: 'Euro'},
      {id: 'GBP', name: 'British pound'},
      {id: 'USD', name: 'US Dollar'}
    ];

    this.buildForm();
  }

  submitForm() {
    this.isLoading = true;

    this.projectService.create(this.form.value)
      .finally(() => this.isLoading = false)
      .subscribe(() => {
        },
        (err: HttpErrorResponse) => {
          this.handleErrors(err);
        });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      currency: [this.currencies[0].id]
    });
  }

}
