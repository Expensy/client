import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  category: Category;
  private categoryId: number;
  private isLoading: boolean;
  private projectId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService) {
    this.projectId = +this.route.snapshot.params['projectId'];
    this.categoryId = +this.route.snapshot.params['categoryId'];
  }

  ngOnInit() {
    this.isLoading = false;

    this.categoryService.show(this.categoryId)
      .subscribe((category) => this.category = category);
  }

  submitForm(formValues) {
    this.isLoading = true;

    this.categoryService.update(this.categoryId, formValues)
      .finally(() => this.isLoading = false)
      .subscribe(() => {
          this.router.navigate(['/projects', this.projectId, 'entries']);
        },
        (err: HttpErrorResponse) => {
          // TODO show errors
          console.error(err);
        });
  }
}
