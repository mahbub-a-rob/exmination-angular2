import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
import { ExaminationService, ExaminationModel } from '../services/examination.service';
import { SubjectService, SubjectModel } from '../services/subject.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'examination-examination',
    templateUrl: '../views/examination.html',
    styleUrls: ['../styles/examination.scss'],
    providers: [
        ExaminationService,
        SubjectService
    ]
})
export class ExaminationComponent {
    constructor(private service: ExaminationService, private subjectService: SubjectService, build: FormBuilder) {
        // create form validators

        // get subject data 
        this.subjectService.details().subscribe(subjects => this.subjects = subjects);
    }
    Url = Url;
    form: FormGroup;
    subjects: Array<SubjectModel> = [];
    examinations: Array<ExaminationModel> = [];
}