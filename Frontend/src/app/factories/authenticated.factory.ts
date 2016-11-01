export class AuthenticatedFactory {
    private static key: string = 'examinationUUID';

    static setAuthenticated(uuid: string): void {
        sessionStorage.setItem(this.key, uuid);
    }

    static get getAuthenticated(): string {
        return sessionStorage.getItem(this.key);
    }

    static clearAuthenticated(): void {
        sessionStorage.removeItem(this.key);
    }
}