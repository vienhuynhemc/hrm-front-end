import {Department} from './department';
import {Date} from "./date";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  doB: Date;
  email: string;
  address: string;
  city: string;
  department: Department;
}

