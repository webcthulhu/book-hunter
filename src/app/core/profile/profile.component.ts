import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { tap } from 'rxjs/operators';
import { slideInOutAnimation } from '../animations';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';
import { DialogAvatarsListComponent } from '../dialog-avatars-list/dialog-avatars-list.component';
import { DialogRemoveBookComponent } from '../dialog-remove-book/dialog-remove-book.component';
import { ILanguage } from '../interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [ slideInOutAnimation ]
})
export class ProfileComponent implements OnInit {
  @HostBinding('@slideInOutAnimation') '';
  public edit: boolean;
  public form: FormGroup;
  public readonly books$;
  public readonly user$;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private store: StoreService,
    private dialog: MatDialog,
    @Inject('LANGUAGES') public languages: ILanguage[]
  ) {
    this.books$ = this.store.books$;
    this.edit = false;
    this.user$ = this.store.user$.pipe(tap(res => {
      this.form = this.fb.group({
        language: [res.language || '', []],
        username: [res.username || '', []]
      });
    }));
  }
  ngOnInit() {
    // this.form = this.fb.group({
    //   language: ['', []],
    //   username: ['', []]
    // });
  }
  getLanguageTitle(code) {
    const language = this.languages.find(l => l.code === code);
    return language.title;
  }
  onAvatarClick() {
    this.dialog
      .open(DialogAvatarsListComponent, { width: '300px' }).afterClosed()
      .subscribe((avatar: string) => {
        if (!avatar) { return; }
        this.api.updateProfile({
          avatar: avatar
        });
      });
  }
  onBookInfo(book: string) {
    this.api.getBookDescription(book);
  }
  onBookRemove(book) {
    this.dialog
      .open(DialogRemoveBookComponent, { width: '300px' }).afterClosed()
      .subscribe((agree: boolean) => {
        if (agree) { this.store.removeBook(book); }
      });
  }
  onFormSubmit(model) {
    this.edit = false;
    this.api.updateProfile({
      username: model.username,
      language: model.language
    });
  }
  // onLanguageChange(ev) {
  //   console.log(ev.value);
  //   this.api.updateProfile({
  //     language: model.language
  //   });
  // }
  onSignOut() {
    this.auth.signOut();
  }
  trackById(index, item) {
    return item.id;
  }
}
