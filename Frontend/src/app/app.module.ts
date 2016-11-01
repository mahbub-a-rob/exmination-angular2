import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { ValidationComponent } from './validations/validation.component';
import { ValidationFactory } from './validations/validation.factory';
import { HttpFactory } from './factories/http.factory';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AuthenticatedActive } from './services/authenActive.service';
import { URL } from './factories/URL.factory';
import { UnAuthenticatedActive } from './services/unAuthenActive.service';
import { ButtonLoadingDirective } from './directives/button.loading';
import { ExaminationTypeComponent } from './components/examination_types/examination_types';
import { StringNullPipe } from './pipes/string-null';
import { ExaminationsComponent } from './components/examinations/examinations';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        RegisterComponent,
        LoginComponent,
        ValidationComponent,
        DashboardComponent,
        ExaminationTypeComponent,
        ExaminationsComponent,
        ButtonLoadingDirective,
        StringNullPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: URL.register, pathMatch: 'full' },
            { path: URL.register, component: RegisterComponent, canActivate: [UnAuthenticatedActive] },
            { path: URL.login, component: LoginComponent, canActivate: [UnAuthenticatedActive] },
            { path: URL.dashboard, component: DashboardComponent, canActivate: [AuthenticatedActive] },
            {
                path: URL.examination,
                canActivate: [AuthenticatedActive],
                children: [
                    { path: '' },
                    {
                        path: URL.examination_types,
                        children: [
                            { path: '', component: ExaminationTypeComponent, data: { type: 'list' } },
                            { path: URL.create, component: ExaminationTypeComponent, data: { type: 'create' } },
                            { path: ':id', component: ExaminationTypeComponent, data: { type: 'update' } }
                        ]
                    },
                    {
                        path: URL.examinations,
                        children: [
                            { path: '', component: ExaminationsComponent, data: { type: 'list' } },
                            { path: ':types_id', component: ExaminationsComponent, data: { type: 'single' } },
                            { path: ':types_id/' + URL.create, component: ExaminationsComponent, data: { type: 'create' } },
                            { path: ':types_id/' + URL.update + '/:exam_id', component: ExaminationsComponent, data: { type: 'update' } },
                        ]
                    }
                ]
            }
        ])
    ],
    providers: [
        HttpFactory,
        AuthenticatedActive,
        UnAuthenticatedActive
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
