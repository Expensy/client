import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './routes/login/login.component';
import { routing } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { AuthInterceptor } from './setup/http.interceptor';
import { RegisterComponent } from './routes/register/register.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ProjectsComponent } from './routes/projects/projects.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { ProjectService } from './services/project/project.service';
import { ProjectFeedComponent } from './routes/project-feed/project-feed.component';
import { ProjectResolveService } from './services/project-resolve/project-resolve.service';
import { EntryService } from './services/entry/entry.service';
import { EntryNewComponent } from './routes/entry-new/entry-new.component';
import { ProjectNewComponent } from './routes/project-new/project-new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingIndicatorComponent,
    LoginComponent,
    RegisterComponent,
    ProjectsComponent,
    ProjectFeedComponent,
    EntryNewComponent,
    ProjectNewComponent
  ],
  imports: [
    routing,
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxErrorsModule
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    ProjectService,
    ProjectResolveService,
    EntryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
