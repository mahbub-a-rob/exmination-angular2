import { SessionFactory } from './session.factory';
export class AuthorizationFactory {
    private static authorization: string = 'authorization';
    private static memberStorage = 'memberStorage';

    public static get getAuthorization() {
        return SessionFactory.get(this.authorization);
    }

    public static setAuthorization(value: string) {
        SessionFactory.set(this.authorization, value, null);
    }


    public static get getMember() {
        return SessionFactory.get(this.memberStorage);
    }

    public static setMember(value: string) {
        SessionFactory.set(this.memberStorage, value, null);
    }
}