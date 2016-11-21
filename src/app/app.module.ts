import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { SigninComponent } from './components/signin.component';
import { SignupComponent } from './components/signup.component';
import { Url } from './factories/url.factory';
import { HttpService } from './services/http.service';
import { ValidationDirective } from './directives/validation.directive';
import { DashboardComponent } from './components/dashboard.component';
import { AuthorizationService, UnAuthorizationService } from './services/authorization.service';
import { SignoutComponent } from './components/signout.component';
import { SubjectComponent } from './components/subject.component';
import { DatePipe, NullTextPipe } from './pipes/apps.pipe';
import { ExaminationComponent } from './components/examination.component';
import { SelectDirective } from './directives/apps.directive';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SigninComponent,
        SignupComponent,
        SignoutComponent,
        DashboardComponent,
        SubjectComponent,
        ExaminationComponent,
        ValidationDirective,
        SelectDirective,
        DatePipe,
        NullTextPipe
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        // For routes
        RouterModule.forRoot([
            // UnAuthorizationService
            { path: Url.Signin, component: SigninComponent, canActivate: [UnAuthorizationService] },
            { path: Url.Signup, component: SignupComponent, canActivate: [UnAuthorizationService] },
            // AuthorizationService
            { path: Url.Signout, component: SignoutComponent, canActivate: [AuthorizationService] },
            { path: Url.Dashboard, component: DashboardComponent, canActivate: [AuthorizationService] },
            { path: Url.Subject, component: SubjectComponent, canActivate: [AuthorizationService] },
            { path: Url.Examination, component: ExaminationComponent, canActivate: [AuthorizationService] },
            // Another path
            { path: Url.Home, redirectTo: Url.Signin, pathMatch: 'full' },
            { path: '*', redirectTo: Url.Signin, pathMatch: 'full' },
        ])
    ],
    providers: [
        HttpService,
        AuthorizationService,
        UnAuthorizationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
