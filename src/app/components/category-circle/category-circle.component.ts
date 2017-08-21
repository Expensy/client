import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-circle',
  templateUrl: './category-circle.component.html',
  styleUrls: ['./category-circle.component.scss']
})
export class CategoryCircleComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit() {
  }

}
