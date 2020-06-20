export class TitleService {
  
    title:string;

    constructor(){
        this.title = null;
    }
    public getTitle(): string {
        return this.title;
    }

    public setTitle(value: string) {
        this.title = value;
    }
  
}