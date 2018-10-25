import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { AuthComponent } from './core/auth/auth.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LibraryComponent } from './core/library/library.component';
import { DiscoverComponent } from './core/discover/discover.component';
import { ChatComponent } from './core/chat/chat.component';
import { ProfileComponent } from './core/profile/profile.component';
import { MapComponent } from './core/map/map.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent, data: {title: 'Sign In'} },
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard], data: {title: 'Library'} },
  { path: 'queue', component: DiscoverComponent, canActivate: [AuthGuard], data: {title: 'Discover'} },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard], data: {title: 'Chat'} },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard], data: {title: 'Map'} },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {title: 'Profile'} },
  { path: '',   redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
