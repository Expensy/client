import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { ProjectsComponent } from './routes/projects/projects.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { ProjectFeedComponent } from './routes/project-feed/project-feed.component';
import { ProjectResolveService } from './services/project-resolve/project-resolve.service';
import { ProjectNewComponent } from './routes/project-new/project-new.component';
import { EntryNewComponent } from './routes/entry-new/entry-new.component';
import { EntryEditComponent } from './routes/entry-edit/entry-edit.component';

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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectsComponent
      },
      {
        path: 'new',
        component: ProjectNewComponent
      },
      {
        path: ':projectId/entries',
        resolve: {
          project: ProjectResolveService
        },
        children: [
          {
            path: '',
            component: ProjectFeedComponent
          },
          {
            path: 'new',
            component: EntryNewComponent
          },
          {
            path: ':entryId',
            component: EntryEditComponent
          }
        ]
      }]
  }
];

export const routing = RouterModule.forRoot(routes);
