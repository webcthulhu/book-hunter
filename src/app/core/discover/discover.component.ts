import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  animations: [
    trigger('bookState', [
      state('center', style({
        transform: 'translate(-50%, -50%)'
      })),
      state('left', style({
        transform: 'translate(-200%, -50%)'
      })),
      state('right', style({
        transform: 'translate(100%, -50%)'
      })),
      transition('center => left', animate('300ms ease-in')),
      transition('center => right', animate('300ms ease-in'))
    ])
  ]
})
export class DiscoverComponent {
  queue = null;
  constructor(private api: ApiService) {
    this.queue = [
      {
        id: '1',
        title: 'FIRST',
        author: 'Qwerty U I',
        thumbnail: 'http://books.google.com/books/content?id=98VQ3gHsVsMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        status: 'center'
      },
      {
        id: '2',
        title: 'SECOND',
        author: 'Test Test',
        thumbnail: 'http://books.google.com/books/content?id=98VQ3gHsVsMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        status: 'center'
      },
      {
        id: '3',
        title: 'THIRD',
        author: '123 456',
        thumbnail: 'http://books.google.com/books/content?id=98VQ3gHsVsMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        status: 'center'
      }
    ];
  }
  onClick(e) {
    this.api.getQueue().subscribe(res => {
      console.log('Get Queue Subscription');
      console.dir(res);
    });
  }
  swipeDone(event, book) {
    switch (event.toState) {
      case 'right':
        this.api.keepBook(book).subscribe(res => {
          console.log(res);
        });
        break;
      case 'left':
        this.api.dismissBook(book).subscribe(res => {
          console.log(res);
        });
        break;
    }
  }
}
