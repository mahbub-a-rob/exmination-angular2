import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Url } from './factories/url.fac';
import { HomeComponent } from './components/home.com';
import { SigninComponent } from './components/signin.com';
import { SignupComponent } from './components/signup.com';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SigninComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: Url.Home, component: HomeComponent },
            { path: Url.Signin, component: SigninComponent },
            { path: Url.Signup, component: SignupComponent },
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
