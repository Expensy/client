import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../services/entry/entry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-entry-new',
  templateUrl: './entry-new.component.html',
  styleUrls: ['./entry-new.component.scss']
})
export class EntryNewComponent implements OnInit {
  isLoading: boolean;
  projectId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private entryService: EntryService) {
    this.projectId = +this.route.snapshot.params['projectId'];
  }

  ngOnInit() {
    this.isLoading = false;
  }

  submitForm(formValues) {
    this.isLoading = true;

    this.entryService.create(this.projectId, formValues)
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
