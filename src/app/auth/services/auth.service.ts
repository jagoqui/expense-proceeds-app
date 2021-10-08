import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../../aap.reducer';
import { setUser, unsetUser } from '../redux/auth.actions';
import { unsetItems } from '../../items/redux/items.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription | undefined;

  constructor(private auth: AngularFireAuth, public firestore: AngularFirestore, private storeSvc: Store<AppState>) {}

  private _user: User | null = null;

  get user() {
    return { ...this._user };
  }

  initAuthListeners() {
    this.auth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        const { uid } = firebaseUser;
        this.userSubscription = this.firestore
          .doc(`${uid}/user`)
          .valueChanges()
          .subscribe((firestoreUser) => {
            const user = User.fromFirestore(firestoreUser);
            this._user = user;
            this.storeSvc.dispatch(setUser({ user }));
          });
      } else {
        this._user = null;
        this.storeSvc.dispatch(unsetUser());
        this.storeSvc.dispatch(unsetItems());
        this.userSubscription?.unsubscribe();
      }
    });
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
