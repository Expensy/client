import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';
import { Entry } from '../../models/entry';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Project } from '../../models/project';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseFormComponent implements OnInit {
  @Input() entry: Entry;
  @Output() onSubmit = new EventEmitter<EntryForm>();

  categories: Category[];
  project: Project;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private categoryService: CategoryService) {
    super();
    this.project = this.route.snapshot.data['project'];
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

    this.categoryService.list(this.project.id)
      .subscribe((response) => {
        this.categories = response.items;
        const defaultCategory = this.categories.find((category) => category.by_default) || this.categories[0];
        if (!this.entry) {
          this.form.patchValue({category_id: defaultCategory.id});
        }
      });

    this.buildForm();
  }

  submitForm() {
    this.onSubmit.emit(this.form.value);
  }

  private buildForm(): void {
    const title = this.entry ? this.entry.title : '';
    const price = this.entry ? this.entry.price : 0;
    const date = this.entry ? this.entry.date : '';
    const categoryId = this.entry ? this.entry.category.id : null;
    const content = this.entry ? this.entry.content : '';

    this.form = this.fb.group({
      title: [title, Validators.required],
      price: [price, Validators.required],
      date: [date, Validators.required],
      category_id: [categoryId, Validators.required],
      content: [content]
    });
  }
}

export class EntryForm {
  id: number;
  title: string;
  price: number;
  date: string;
  category_id: number;
  content: string;
}
