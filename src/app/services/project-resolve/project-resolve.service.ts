import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProjectService } from '../project/project.service';

@Injectable()
export class ProjectResolveService implements Resolve<Project> {

  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.projectService.show(route.params['projectId']);
  }
}
