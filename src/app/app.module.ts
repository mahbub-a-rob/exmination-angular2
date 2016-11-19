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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SigninComponent,
        SignupComponent,
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
            { path: Url.Signin, component: SigninComponent },
            { path: Url.Signup, component: SignupComponent },
        ])
    ],
    providers: [
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
