import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  isCollapsed: boolean;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isCollapsed = true;

    const user = this.authService.user.getValue();
    const projectId = +this.route.snapshot.params['projectId'];
    const project = user.projects.find((p) => p.id === projectId);
    this.authService.project.next(project);
  }
}
