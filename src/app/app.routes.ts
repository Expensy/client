import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { ProjectFeedComponent } from './routes/project-feed/project-feed.component';
import { ProjectResolveService } from './services/project-resolve/project-resolve.service';
import { ProjectNewComponent } from './routes/project-new/project-new.component';
import { EntryNewComponent } from './routes/entry-new/entry-new.component';
import { EntryEditComponent } from './routes/entry-edit/entry-edit.component';
import { CategoryNewComponent } from './routes/category-new/category-new.component';
import { CategoryEditComponent } from './routes/category-edit/category-edit.component';
import { ProjectEditComponent } from './routes/project-edit/project-edit.component';
import { ProjectComponent } from './routes/project/project.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/projects',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'projects/new',
    canActivate: [AuthGuard],
    component: ProjectNewComponent
  },
  {
    path: 'projects/:projectId',
    canActivate: [AuthGuard],
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: ProjectEditComponent,
        resolve: {
          project: ProjectResolveService
        }
      },
      // Categories routes
      {
        path: 'categories',
        resolve: {
          project: ProjectResolveService
        },
        children: [
          {
            path: 'new',
            component: CategoryNewComponent
          },
          {
            path: ':categoryId',
            component: CategoryEditComponent
          }
        ]
      },

      // entries routes
      {
        path: 'entries',
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
      }
    ]
  }

];

export const routing = RouterModule.forRoot(routes);
