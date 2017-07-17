import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
  @Input() backgroundColor: string;
  @Input() color: string;
  @Input() size: number;
  private array: number[];

  constructor() { }

  ngOnInit() {
    this.array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.backgroundColor = this.backgroundColor || 'none';
    this.color = this.color || '#333333';
    this.size = this.size || 16;
  }

}
