import { Injectable } from '@angular/core';
import { HttpFactory } from '../factories/http.factory';
import { AuthenticatedFactory } from '../factories/authenticated.factory';
import { IResponse } from '../interfaces/response.interface';

export class MemberModel {
    mem_id: number;
    mem_email: string;
    mem_password: string;
    mem_role: string;
    mem_status: string;
    mem_updated: string;
    mem_created: string;
    mem_social_id: string;
    mem_token: string;
}

export class MemberDetailModel {
    mem_d_id: number;
    mem_d_firstname: string;
    mem_d_lastname: string;
    mem_d_gender: string;
    mem_d_phone: string;
    mem_d_address: string;
    mem_d_city: string;
    mem_d_zipcode: string;
    mem_d_birthday: string;
    mem_d_created: string;
    mem_d_updated: string;
    mem_id: number;
}

@Injectable()
export class MemberService {
    constructor(private http: HttpFactory) {
        if (MemberService.member == null && AuthenticatedFactory.getAuthenticated) {
            this.apply(AuthenticatedFactory.getAuthenticated);
        }
    }

    private static member: MemberModel = null;
    domain: string = 'members';

    // apply member to object
    apply(token): void {
        // request to server
        this.http.requestGet('members/' + token)
            .subscribe((member: MemberModel) => MemberService.member = member);
    }

    // get member
    get instans(): MemberModel {
        return MemberService.member;
    }

    // create
    create(model: MemberModel) {
        return this.http.requestCreate(this.domain, model)
            .do((res: IResponse) => { if (res.code === 200) this.apply(res.response); });
    }

    // check login
    login(model: MemberModel) {
        return this.http.requestCreate(this.domain + '/login', model)
            .do((res: IResponse) => { if (res.code === 200) this.apply(res.response); });
    }

}