import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';
import { Category } from '../../models/category';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseFormComponent implements OnInit {
  @Input() category: Category;
  @Output() onSubmit = new EventEmitter<CategoryForm>();

  constructor(private fb: FormBuilder) {
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
      ]
    };

    this.buildForm();
  }

  submitForm() {
    this.onSubmit.emit(this.form.value);
  }

  private buildForm(): void {
    const title = this.category ? this.category.title : '';
    const color = this.category ? this.category.color : '#123456';
    const by_default = this.category ? this.category.by_default : false;

    this.form = this.fb.group({
      title: [title, Validators.required],
      color: [color, Validators.required],
      by_default: [by_default]
    });
  }

}

export class CategoryForm {
  id: number;
  title: string;
  color: string;
  by_default: boolean;
}
