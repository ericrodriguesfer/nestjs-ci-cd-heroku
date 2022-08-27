import { randomUUID } from 'crypto';

class User {
  public id: string;
  public name: string;
  public email: string;
  public age: number;

  constructor({ name, email, age }: Omit<User, 'id'>) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

export default User;
