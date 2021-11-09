import { Department } from './department';
import { Date } from "./date";

export class Employee {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    gender: string | undefined;
    doB: Date | undefined;
    email: string | undefined;
    address: string | undefined;
    city: string | undefined;
    department: Department | undefined;
}

