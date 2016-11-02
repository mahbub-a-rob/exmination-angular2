import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminationQeustionService, IExamination_questions, examination_questions } from '../../services/examination_questions.service';
import { AlertFactory } from '../../factories/alert.factory';
import { URL } from '../../factories/URL.factory';
@Component({
    selector: 'app-examination-question',
    templateUrl: 'examination_questions.html',
    styleUrls: ['examination_questions.less'],
    providers: [ExaminationQeustionService]
})
export class ExaminationQeustionComponent {
    URL = URL;
    constructor(private route: ActivatedRoute,
        private service: ExaminationQeustionService,
        private router: Router) {
        this.processComponent();
    }

    page: string = null;
    collections: IExamination_questions = new IExamination_questions();
    exam_id: number = 0;

    createForm() {
        if (this.exam_id === 0) {
            AlertFactory.warning('กรุณาเลือกข้อสอบ หากคุณต้องการเพิ่มโจทย์ข้อสอบ');
            return;
        }
        this.router.navigate([this.URL.examination, this.URL.examination_questions, this.exam_id, this.URL.create]);
    }

    private processComponent() {
        this.collections.examinations = [];
        this.collections.questions = [];

        this.route.data.forEach(data => {
            this.page = data['type'];
            switch (this.page) {
                default:
                    this.service.get.subscribe(res => this.collections = res);
                    break;
            }
        });
    }
}