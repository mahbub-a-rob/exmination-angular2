export class SessionFactory {
    // set session storage
    public static set(key: string, value: any, time: number = 20): void {
        let name = value;
        try {
            // set date
            let datetime = new Date(); datetime.setMinutes(datetime.getMinutes() + time)
            name = JSON.stringify({ time: datetime, data: typeof value === 'object' ? JSON.stringify(value) : value });
        }
        catch (e) { console.log('session error ', e); }
        sessionStorage.setItem(key, name);
    }

    // clear session storage
    public static remove(key: string): void {
        sessionStorage.removeItem(key);
    }

    // get session storage
    public static get(key: string): any {
        let name = sessionStorage.getItem(key);
        if (name == null) return null;
        let objectData = JSON.parse(name);
        let datetime = new Date(objectData.time);
        if (datetime < new Date()) {
            this.remove(key);
            return null
        };
        try { name = JSON.parse(objectData.data); }
        catch (e) { name = objectData.data; }
        return name || null;
    }
}