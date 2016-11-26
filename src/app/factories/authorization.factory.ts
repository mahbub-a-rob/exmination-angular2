import { SessionFactory } from './session.factory';
export class AuthorizationFactory {
    private static authorization: string = 'authorization';
    private static memberStorage = 'memberStorage';

    public static get getAuthorization() {
        return localStorage.getItem(this.authorization);
    }

    public static setAuthorization(value: string) {
        localStorage.setItem(this.authorization, value);
    }


    public static get getMember() {
        return localStorage.getItem(this.memberStorage);
    }

    public static setMember(value: string) {
        localStorage.setItem(this.memberStorage, JSON.stringify(value));
    }
}