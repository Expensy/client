import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent extends BaseFormComponent implements OnInit {
  @Input() project: Project;
  @Output() onSubmit = new EventEmitter<ProjectForm>();

  currencies: any[];

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
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
      ],
      currency: [
        {
          name: 'required',
          message: 'Please enter a currency',
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
    this.onSubmit.emit(this.form.value);
  }

  private buildForm(): void {
    const title = this.project ? this.project.title : '';
    const currency = this.project ? this.project.currency : '';

    this.form = this.fb.group({
      title: [title, Validators.required],
      currency: [currency, Validators.required]
    });
  }
}

export class ProjectForm {
  id: number;
  title: string;
  currency: string;
}
