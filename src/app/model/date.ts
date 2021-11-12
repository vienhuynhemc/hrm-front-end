export class Date {
    day: number | undefined;
    month: number | undefined;
    year: number | undefined;

    public format(): string {
        let day = this.day! < 10 ? "0" + this.day : this.day;
        let month = this.month! < 10 ? "0" + this.month : this.month;
        return `${day}/${month}/${this.year}`;
    }
}