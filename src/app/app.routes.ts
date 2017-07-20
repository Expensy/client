import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { ProjectsComponent } from './routes/projects/projects.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { ProjectFeedComponent } from './routes/project-feed/project-feed.component';
import { ProjectResolveService } from './services/project-resolve/project-resolve.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId',
    canActivate: [AuthGuard],
    resolve: {
      project: ProjectResolveService
    },

    children: [
      {
        path: '',
        component: ProjectFeedComponent
      }
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
