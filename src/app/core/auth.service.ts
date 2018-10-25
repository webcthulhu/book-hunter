import { Injectable } from '@angular/core';
import { BehaviorSubject, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

interface User {
  id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly user: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {
    this.afa.authState.pipe(
      switchMap(auth => {
        if (auth) {
          return this.afs.doc<User>('users/' + auth.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    ).subscribe((user: User) => {
      this.user.next(user);
    });
  }
  get user$ () {
    return this.user.asObservable();
  }
  public signIn(data) {
    return this.afa.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  public signOut() {
    return this.afa.auth.signOut();
  }
  public signUp(data) {
    return this.afa.auth.createUserWithEmailAndPassword(data.email, data.password);
  }
  // public createUser(authData) {
  //   this.afs.collection('users').doc(authData.uid).set({
  //     id: authData.uid,
  //     email: authData.email,
  //     username: authData.username
  //   });
  // }
  // public updateUser(authData) {
  //   this.afs.collection('users').doc(authData.uid).set({
  //     id: authData.uid,
  //     email: authData.email
  //   }, { merge: true });
  // }
}
