import { SessionFactory } from './session.factory';
export class AuthorizationFactory {
    private static authorization: string = 'authorization';

    public static get getAuthorization() {
        return SessionFactory.get(this.authorization);
    }

    public static setAuthorization(value: any) {
        SessionFactory.set(this.authorization, value, 120);
    }
}