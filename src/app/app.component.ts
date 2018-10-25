import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { StoreService } from './core/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navLinks = [
    { icon: 'book', label: 'Library', path: '/library' },
    { icon: 'search', label: 'Discover', path: '/queue' },
    { icon: 'chat', label: 'Chat', path: '/chat' },
    { icon: 'map', label: 'Map', path: '/map' },
    { icon: 'account_circle', label: 'Profile', path: '/profile' }
  ];
  private readonly logged$;
  private readonly title$;
  constructor(private location: Location, private router: Router, private store: StoreService) {
    this.logged$ = this.store.logged$;
    this.title$ = this.store.state$.pipe(map(state => state.title));
    this.store.logged$.subscribe(res => {
      res ? this.router.navigate(['/profile']) : this.router.navigate(['/auth']);
    });
  }
  get logged() { return this.logged$; }
  get title() { return this.title$; }
  back() {
    this.location.back();
  }
}
