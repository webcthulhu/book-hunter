import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, interval, Observable, of, timer, Subject } from 'rxjs';
import { filter, map, mergeMap, switchMap, take, takeUntil } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';

import {IBook, IGeolocation, IPosition, IUser} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static readonly API = {
    CREATE_QUEUE: 'createQueue',
    DISMISS_BOOK_FROM_QUEUE: 'dismissBookFromQueue',
    KEEP_BOOK_FROM_QUEUE: 'keepBookFromQueue',
    SEARCH_BOOKS: 'searchBooks'
  };
  private static readonly GOOGLE = {
    GEOLOCATION_URL: 'https://www.googleapis.com/geolocation/v1/geolocate?key=',
    APIKEY: 'AIzaSyBapk36VBlEFeDNntZ61Js-zj0yOtAkwi8'
  };
  private readonly books: BehaviorSubject<IBook> = new BehaviorSubject(null);
  private readonly position: BehaviorSubject<IPosition> = new BehaviorSubject(null);
  private readonly user: BehaviorSubject<IUser> = new BehaviorSubject(null);
  private readonly unsubscribe$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private http: HttpClient,
    @Inject('SERVER') private FIREBASE_SERVER
  ) {}
  get books$() {
    return this.books.asObservable();
  }
  get position$() {
    return this.position.asObservable();
  }
  get user$() {
    return this.user.asObservable();
  }
  getBookDescription(book) {
    console.log('ApiService: getBookDescription -', book.id);
  }
  getQueue() {
    if (!this.afa.auth.currentUser) { return of(null); }
    const url = [this.FIREBASE_SERVER, ApiService.API.CREATE_QUEUE].join('/') + `?uid=${this.afa.auth.currentUser.uid}`;
    return this.http.get(url);
  }
  updateBooks(data) {
    if (!this.afa.auth.currentUser) { return; }
    this.afs.doc('books/' + this.afa.auth.currentUser.uid).set(data).then(result => {}, reason => {
      console.error('Cannot update Books');
    });
  }
  updateProfile(data) {
    if (!this.afa.auth.currentUser) { return; }
    const payload = Object.assign({}, data, { id: this.afa.auth.currentUser.uid });
    this.afs.doc('users/' + this.afa.auth.currentUser.uid)
      .set(payload, { merge: true })
      .then(result => {
        console.log('Users/[uid] successfully updated.');
      }, reason => {
        console.error('Cannot update Users/[uid]');
      });
  }
  searchBooks(q) {
    const url = [this.FIREBASE_SERVER, ApiService.API.SEARCH_BOOKS].join('/') + `?q=${q}`;
    return this.http.get(url);
  }
  keepBook(book) {
    if (!this.afa.auth.currentUser) { return of(null); }
    const url = [this.FIREBASE_SERVER, ApiService.API.KEEP_BOOK_FROM_QUEUE].join('/') +
      `?uid=${this.afa.auth.currentUser.uid}&bid=${book.id}`;
    return this.http.get(url);
  }
  dismissBook(book) {
    if (!this.afa.auth.currentUser) { return of(null); }
    const url = [this.FIREBASE_SERVER, ApiService.API.DISMISS_BOOK_FROM_QUEUE].join('/') +
      `?uid=${this.afa.auth.currentUser.uid}&bid=${book.id}`;
    return this.http.get(url);
  }
  subscribeToData() {
    if (!this.afa.auth.currentUser) { return; }
    this.afs.doc('users/' + this.afa.auth.currentUser.uid).valueChanges()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: IUser) => {
        this.user.next(user);
      });
    this.afs.doc('books/' + this.afa.auth.currentUser.uid).valueChanges()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((books: IBook) => {
        this.books.next(books);
      });
    this.afs.doc('positions/' + this.afa.auth.currentUser.uid).valueChanges()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((position: IPosition) => {
        this.position.next(position);
      });
    timer(0, 1000 * 60 * 60) /* 1000ms * 60 * 60 = 1 hour */
      .pipe(
        switchMap( () => this.http.post(ApiService.GOOGLE.GEOLOCATION_URL + ApiService.GOOGLE.APIKEY, {})),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((res: IGeolocation) => {
        this.afs.doc('positions/' + this.afa.auth.currentUser.uid).set({
          id: this.afa.auth.currentUser.uid,
          latitude: res.location.lat,
          longitude: res.location.lng,
          updated: Date.now()
        }).then(result => {}, reason => {});
      });
  }
  unsubscribeFromData() {
    this.unsubscribe$.next(true);
  }
}

// this.afs.collection('profiles', ref => ref.where('username', '==', 'Denis')).valueChanges();
