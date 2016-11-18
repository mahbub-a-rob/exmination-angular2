import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { SigninComponent } from './components/signin.component';
import { SignupComponent } from './components/signup.component';
import { NavbarComponent } from './components/navbar.component';
import { Url } from './factories/url.factory';
import { HttpService } from './services/http.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SigninComponent,
        SignupComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        // For routes
        RouterModule.forRoot([
            { path: Url.Home, component: HomeComponent },
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
