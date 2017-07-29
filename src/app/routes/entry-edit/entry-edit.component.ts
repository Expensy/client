import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../models/entry';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent implements OnInit {
  entry: Entry;
  private entryId: number;
  private isLoading: boolean;
  private projectId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private entryService: EntryService) {
    this.projectId = +this.route.snapshot.params['projectId'];
    this.entryId = +this.route.snapshot.params['entryId'];
  }

  ngOnInit() {
    this.entryService.show(this.entryId)
      .subscribe((entry) => this.entry = entry);
  }

  submitForm(formValues) {
    this.isLoading = true;

    this.entryService.update(this.entryId, formValues)
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
