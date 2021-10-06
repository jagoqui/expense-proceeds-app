export class User {
  constructor(public uid: string, public name: string, public email: string) {}

  static fromFirestore({ uid, name, email }: any) {
    return new User(uid, name, email);
  }
}
