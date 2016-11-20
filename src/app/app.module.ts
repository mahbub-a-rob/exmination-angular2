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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SigninComponent,
        SignupComponent,
        DashboardComponent,
        ValidationDirective
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        // For routes
        RouterModule.forRoot([
            { path: Url.Home, redirectTo: Url.Signin, pathMatch: 'full' },
            { path: Url.Signin, component: SigninComponent, canActivate: [UnAuthorizationService] },
            { path: Url.Signup, component: SignupComponent, canActivate: [UnAuthorizationService] },
            { path: Url.Dashbard, component: DashboardComponent, canActivate: [AuthorizationService] },
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
