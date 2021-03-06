import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

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
import { AuthGuard } from './services/auth-guard/auth.guard';
import { ProjectService } from './services/project/project.service';
import { ProjectFeedComponent } from './routes/project-feed/project-feed.component';
import { ProjectResolveService } from './services/project-resolve/project-resolve.service';
import { EntryService } from './services/entry/entry.service';
import { EntryNewComponent } from './routes/entry-new/entry-new.component';
import { ProjectNewComponent } from './routes/project-new/project-new.component';
import { CategoryService } from './services/category/category.service';
import { EntryEditComponent } from './routes/entry-edit/entry-edit.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { CategoryNewComponent } from './routes/category-new/category-new.component';
import { CategoryEditComponent } from './routes/category-edit/category-edit.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProjectEditComponent } from './routes/project-edit/project-edit.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { InitService } from './services/init/init.service';
import { CategoryCircleComponent } from './components/category-circle/category-circle.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './routes/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingIndicatorComponent,
    LoginComponent,
    RegisterComponent,
    ProjectFeedComponent,
    EntryNewComponent,
    ProjectEditComponent,
    ProjectFormComponent,
    ProjectNewComponent,
    EntryEditComponent,
    EntryFormComponent,
    CategoryNewComponent,
    CategoryEditComponent,
    CategoryFormComponent,
    CategoryCircleComponent,
    ProjectComponent
  ],
  imports: [
    routing,
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxErrorsModule,
    // NgxChartsModule,
    // BrowserAnimationsModule
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
    EntryService,
    CategoryService,
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: (initService: InitService) => () => initService.init(),
      deps: [InitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
