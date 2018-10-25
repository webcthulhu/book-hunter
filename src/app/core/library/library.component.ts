import { Component, HostBinding, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { slideInOutAnimation } from '../animations';
import { ApiService } from '../api.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  animations: [ slideInOutAnimation ]
})
export class LibraryComponent implements OnInit {
  @HostBinding('@slideInOutAnimation') '';
  public searchedBooks = [];
  public searchedTotal: number = null;
  public search: string = <string> '';
  public keyUp: Subject<string> = new Subject<string>();
  constructor(private api: ApiService, private store: StoreService) {
    this.keyUp.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => this.api.searchBooks(this.search))
    ).subscribe((res: any) => {
      if (!res) { return; }
      this.searchedTotal = res.totalItems;
      this.searchedBooks = res.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title || '',
        author: (item.volumeInfo.authors && item.volumeInfo.authors.join(', ')) || '',
        thumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail,
        // description: item.volumeInfo.description || ''
      }));
    });
  }
  ngOnInit() {}
  onAddClick(book) {
    this.store.addBook(book);
  }
  onCleanClick() {
    this.search = '';
    this.searchedBooks = [];
  }
  onSearchChange(event) {
    this.keyUp.next(event);
  }
}
