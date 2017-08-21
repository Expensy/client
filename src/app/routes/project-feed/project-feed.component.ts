import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../models/entry';
import { CategoryService } from '../../services/category/category.service';
import { HttpParams } from '@angular/common/http';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'app-project-feed',
  templateUrl: './project-feed.component.html',
  styleUrls: ['./project-feed.component.scss']
})
export class ProjectFeedComponent implements OnInit {
  categories: Object;
  entries: Entry[];
  isLoading: boolean;
  project: Project;
  projectId: number;

  view: any[] = [400, 200];

  lineData = [
    {
      name: 'toto',
      series: [
        {
          name: 'August 2017',
          value: 1543
        },
        {
          name: 'July 2017',
          value: 1740
        },
        {
          name: 'June 2017',
          value: 1550
        },
        {
          name: 'May 2017',
          value: 1640
        }
      ]
    }
  ];

  // options
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454']
  };

  // line, area
  autoScale = true;

  pieView: any[] = [300, 200];
  pieColorScheme = {
    domain: []
  };
  pieChartData: any = [];
  pieShowLabels = true;
  pieShowLegend = false;

  private pagination: Pagination;
  private stats: any;

  constructor(private route: ActivatedRoute, private entryService: EntryService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.project = this.route.snapshot.data['project'];
    this.projectId = +this.route.snapshot.params['projectId'];

    this.entries = [];
    this.stats = {
      total: 0,
      categories: []
    };

    this.loadEntries(1);
  }

  loadMore() {
    this.loadEntries(this.pagination.current_page + 1);
  }

  private loadEntries(page: number) {
    this.isLoading = true;

    const params = new HttpParams()
      .set('start_date', '2017-07-01')
      .set('end_date', '2017-08-13')
      .set('page', page.toString(10));

    this.entryService.list(this.projectId, {
      observe: 'body',
      params: params
    })
      .finally(() => this.isLoading = false)
      .subscribe((response) => {
        this.entries = this.entries.concat(response.items);
        this.stats = response.stats;

        response.stats['categories'].forEach((item) => {
          this.pieChartData.push({
            name: item.title,
            value: item.total / 100
          });
        });

        this.pagination = response.paginate;
      });

    this.categoryService.list(this.projectId)
      .finally(() => this.isLoading = false)
      .subscribe((response) => {
        this.pieColorScheme.domain = response.items.map((item) => item.color);

        this.categories = response.items.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
      });
  }

  deleteEntry(id: number) {
    this.entryService.remove(id)
      .subscribe(() => {
        this.entries = this.entries.filter((entry) => entry.id !== id);
      });
  }
}
