import { Injectable } from '@angular/core';
import { ChildActivationEnd, Router} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, mergeMap, share, switchMap, take, tap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { MapService } from './map.service';
import { IPosition } from './interfaces';
import { State } from './models/state';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private state: State = new State({});
  private stateSource: BehaviorSubject<any> = new BehaviorSubject(this.state);
  private booksObservable: Observable<any> = this.stateSource.asObservable().pipe(map(state => state.books));
  private loggedObservable: Observable<any> = this.stateSource.asObservable().pipe(map(state => state.logged), distinctUntilChanged());
  private userObservable: Observable<any> = this.stateSource.asObservable().pipe(map(state => ({
    id: state.id,
    avatar: state.avatar,
    email: state.email,
    language: state.language,
    username: state.username
  })));
  private positionObservable: Observable<any> = this.stateSource.asObservable().pipe(map(state => ({
    latitude: state.position.latitude,
    longitude: state.position.longitude
  })));
  private stateObservable = this.stateSource.asObservable().pipe(share());
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private gmap: MapService,
    private router: Router,
    private translate: TranslateService,
  ) {
    /* Language settings */
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.auth.user$.subscribe(user => {
      if (user) {
        this.state = new State({
          logged: true,
          id: user.id,
          email: user.email
        });
        this.api.subscribeToData();
      } else {
        this.state = new State({});
        this.api.unsubscribeFromData();
      }
      this.stateSource.next(this.state);
    });
    this.api.position$.subscribe((position: IPosition) => {
      if (!position) { return; }
      this.state.position.latitude = position.latitude;
      this.state.position.longitude = position.longitude;
      this.state.position.updated = position.updated;
      this.stateSource.next(this.state);
    });
    this.api.books$.subscribe(books => {
      if (!books) { return; }
      this.state.books = Object.values(books);
      this.stateSource.next(this.state);
    });
    this.api.user$.subscribe(user => {
      if (!user) { return; }
      this.state.avatar = user.avatar;
      this.state.language = user.language;
      this.state.username = user.username;
      this.stateSource.next(this.state);
    });
    this.router.events.pipe(
      filter(event => event instanceof ChildActivationEnd),
      map((event: ChildActivationEnd) => event.snapshot),
      map(snapshot => {
        while (snapshot.firstChild) { snapshot = snapshot.firstChild; }
        return snapshot;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.data),
    ).subscribe(data => {
      this.state.title = data.title || 'Book Samaritan';
      this.stateSource.next(this.state);
    });
  }
  get books$() { return this.booksObservable; }
  get logged$() { return this.loggedObservable; }
  get user$() { return this.userObservable; }
  get position$() { return this.positionObservable; }
  get state$() { return this.stateObservable; }
  addBook(book) {
    const exist = this.state.books.find(i => i.id === book.id);
    if (!!exist) {
      return;
    } else {
      this.state.books = [ ...this.state.books, book ];
    }
    const books = {};
    this.state.books.forEach(b => books[b.id] = b);
    this.api.updateBooks(books);
  }
  removeBook(book) {
    this.state.books = this.state.books.filter(item => item.id !== book.id);
    const books = {};
    this.state.books.forEach(b => books[b.id] = b);
    this.api.updateBooks(books);
  }
}
