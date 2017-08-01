import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit {
  isLoading: boolean;
  projectId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService) {
    this.projectId = +this.route.snapshot.params['projectId'];
  }

  ngOnInit() {
    this.isLoading = false;
  }

  submitForm(formValues) {
    this.isLoading = true;

    this.categoryService.create(this.projectId, formValues)
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
