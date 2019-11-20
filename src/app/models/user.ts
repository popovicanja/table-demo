import {Gender} from './gender.enum';

export interface User {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  state_code: string;
  city: string;
  address: string;
  phone: string;
}
