export class User {
    constructor(
        public email: string,
        public fname: string,
        public lname: string,

        public id: string,
        private _token: string,
        private tokenExpirationDate: Date,

        public status?: number,
        public role?: string,



    ) { }

    get token() {
        if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
            return null;
        }
        return this._token;
    }
    
    get tokenDuration() {
        if (!this.token) {
            return 0;
        }
        return this.tokenExpirationDate.getTime() - new Date().getTime();
    }

}
