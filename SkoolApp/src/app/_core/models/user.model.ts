export class User {
    constructor(
        public email: string,
        public fname: string,
        public lname: string,
        public password: string,
        public status?: number,
        public role?: string,
    ) { }

}
