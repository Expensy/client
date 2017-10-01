import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class ProjectResolveService implements Resolve<Project> {

  constructor(private authService: AuthService, private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const project = this.authService.project.getValue();
    return this.projectService.show(project.id);
  }
}
