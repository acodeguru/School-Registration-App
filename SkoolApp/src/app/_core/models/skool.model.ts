export class Skool {
    uuid: string;
    name: string;
    address: string;
    email: string;
    phone: number;
    nostudents: number;

    constructor() { 
        this.uuid = null;
        this.name = null;
        this.address = null;
        this.email = null;
        this.phone = null;
        this.nostudents = null;
    }

    public setAll( uuid: string, name: string, address: string, email: string, phone: number, nostudents: number) {
        this.uuid = uuid;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.nostudents = nostudents;
    }

    public getUUID(): string {
        return this.uuid;
    }

    public setUUID(value: string) {
        this.uuid = value;
    }
    
    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(value: string) {
        this.address = value;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(value: string) {
        this.email = value;
    }

    public getPhone(): number {
        return this.phone;
    }

    public setPhone(value: number) {
        this.phone = value;
    }

    public getNoStudents(): number {
        return this.nostudents;
    }

    public setNoStudents(value: number) {
        this.nostudents = value;
    }

}
