import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

interface IBook {
  author: string;
  title: string;
  thumbnail: string;
}

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
  @Input('add') set _add(value: boolean) {
    this.showAdd = value;
  }
  @Input('book') set _book(value: IBook) {
    this.author = value.author || '';
    this.cover = value.thumbnail || null;
    this.title = value.title || '';
  }
  @Input('dense') set _dense(value: boolean) {
    this.dense = value;
  }
  @Input('remove') set _remove(value: boolean) {
    this.showRemove = value;
  }
  @Output() add = new EventEmitter<string>();
  @Output() info = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  public author: string;
  public cover: string;
  public dense: boolean;
  public showAdd: boolean;
  public showRemove: boolean;
  public title: string;
  constructor() {}
  onAddClick(): void {
    this.add.emit();
  }
  onInfoClick(): void {
    this.info.emit();
  }
  onRemoveClick(): void {
    this.remove.emit();
  }
}
