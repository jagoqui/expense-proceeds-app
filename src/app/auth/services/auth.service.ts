import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth, public firestore: AngularFirestore) {}

  initAuthListeners() {
    this.auth.authState.subscribe((firebaseUser) => {});
  }

  newUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      if (!user) {
        return;
      }
      const newUser = new User(user.uid, name, email);
      //TODO: Si falla el guardado, eliminar el email
      return this.firestore
        .doc(`${user.uid}/user`)
        .set({ ...newUser })
        .catch((error) => console.error(error));
    });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map((firebaseUser) => !!firebaseUser));
  }
}
