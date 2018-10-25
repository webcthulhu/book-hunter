import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AgmCoreModule } from '@agm/core';

import { AuthComponent } from './auth/auth.component';
import { BookCardComponent } from './book-card/book-card.component';
import { ChatComponent } from './chat/chat.component';
import { DialogAvatarsListComponent } from './dialog-avatars-list/dialog-avatars-list.component';
import { DialogRemoveBookComponent } from './dialog-remove-book/dialog-remove-book.component';
import { DiscoverComponent } from './discover/discover.component';
import { LibraryComponent } from './library/library.component';
import { MapComponent } from './map/map.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { QueueComponent } from './queue/queue.component';

import { AuthGuard } from './guards/auth.guard';

import { environment } from '../../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] } }),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDPtlXKRFhhFJRQVwVbzrTeRTAzbp4wvS4' })
  ],
  providers: [
    AuthGuard,
    { provide: 'LANGUAGES',  useValue: environment.languages },
    { provide: 'SERVER',  useValue: environment.server }
  ],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [
    AuthComponent,
    NotFoundComponent,
    ProfileComponent,
    LibraryComponent,
    QueueComponent,
    ChatComponent,
    DiscoverComponent,
    MapComponent,
    BookCardComponent,
    DialogAvatarsListComponent,
    DialogRemoveBookComponent
  ],
  entryComponents: [
    DialogAvatarsListComponent,
    DialogRemoveBookComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) { throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.'); }
  }
}
