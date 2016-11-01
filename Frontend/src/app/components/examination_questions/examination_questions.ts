import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExaminationQeustionService, IExamination_questions, examination_questions } from '../../services/examination_questions.service';
@Component({
    selector: 'app-examination-question',
    templateUrl: 'examination_questions.html',
    styleUrls: ['examination_questions.less'],
    providers: [ExaminationQeustionService]
})
export class ExaminationQeustionComponent {
    constructor(private route: ActivatedRoute,
        private service: ExaminationQeustionService) {
        this.processComponent();
    }

    page: string = null;
    collections: IExamination_questions = new IExamination_questions();

    processComponent() {
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