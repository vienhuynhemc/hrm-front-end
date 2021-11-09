export class Date{
    day:number | undefined;
    month:number | undefined;
    year:number | undefined;

    public format():string{
        return `${this.day}/${this.month}/${this.year}`;
    }
}