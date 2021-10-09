import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Item } from '../../shared/models/expense-proceeds.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type ItemsWithoutUID = Omit<Item, 'uid'>;

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private firestore: AngularFirestore, private authSvc: AuthService) {}

  initExpenseProceedsListener(uid: string): Observable<Item[]> {
    return this.firestore
      .collection(`${uid}/expense-proceeds/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot): Item[] =>
          snapshot.map(
            ({ payload }): Item => ({
              uid: payload.doc.id,
              ...(payload.doc.data() as ItemsWithoutUID)
            })
          )
        )
      );
  }

  createExpenseProceed(expenseProceeds: Item) {
    const { uid } = this.authSvc.user;
    return this.firestore
      .doc(`${uid}/expense-proceeds`)
      .collection('items')
      .add({ ...expenseProceeds });
  }

  deleteItem(itemUID: string) {
    const { uid } = this.authSvc.user;
    return this.firestore.doc(`${uid}/expense-proceeds/items/${itemUID}`).delete();
  }
}
