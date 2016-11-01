import { Injectable } from "@angular/core";
import { HttpFactory } from '../factories/http.factory';

export class examination_types {
    types_id: number;
    types_name: string;
    types_detail: string;
    types_created: string;
    types_updated: string;
    mem_id: number;
}

@Injectable()
export class ExaminationTypeService {

    constructor(private http: HttpFactory) { }
    domain: string = "examination_types";

    get all() {
        return this.http.requestGet(this.domain);
    }

    single(id: number) {
        return this.http.requestGet(this.domain + '/' + id);
    }

    create(model: examination_types) {
        return this.http.requestCreate(this.domain, model);
    }

    update(id: number, model: examination_types) {
        return this.http.requestUpdate(this.domain + '/' + id, model);
    }

    delete(id: number) {
        return this.http.requestDelete(this.domain + '/' + id);
    }
}