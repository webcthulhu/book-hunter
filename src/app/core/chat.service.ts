import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

interface Conversation {
  messages: any[];
  participants: string[];
}
interface Post {
  title: string;
  content: string;
}
interface User {
  id: string;
  username: string;
  latitude: number;
  longitude: number;
  conversation: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private posts: Observable<Post[]>;
  private conversationsCollection: AngularFirestoreCollection<any>;
  private profilesCollection: AngularFirestoreCollection<User>;
  private postsCollection: AngularFirestoreCollection<Post>;
  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private http: HttpClient,
    @Inject('SERVER') private FIREBASE_SERVER
  ) {
    this.conversationsCollection = this.afs.collection('conversations');
    this.profilesCollection = this.afs.collection('users');
    this.postsCollection = this.afs.collection('posts');
  }
  get messages$() { return this.posts; }
  // getProfiles() {
  //   return this.profilesCollection.valueChanges().pipe(map(profiles => profiles.filter(i => i.id !== this.afa.auth.currentUser.uid)));
  // }
  // createConversation(id) {
  //   const conversation = [this.afa.auth.currentUser.uid, id].sort((a, b) => {
  //     if (a < b) { return -1; }
  //     if (a > b) { return 1; }
  //     return 0;
  //   }).join('.');
  //   this.afs.collection('conversations').doc(conversation);
  //   this.profilesCollection.doc(this.afa.auth.currentUser.uid).set({ conversation: conversation }, { merge: true });
  //   this.profilesCollection.doc(id).set({ conversation: conversation }, { merge: true });
  // }
  // getConversation(id) {
  //   return this.conversationsCollection.doc<Conversation>(id).valueChanges();
  // }
  // sendMessage(id, data) {
  //   this.conversationsCollection.doc(id).set({ messages: data }, { merge: true });
  // }
  addMessage(data) {
    if (!this.afa.auth.currentUser) { return; }
    const id = this.afa.auth.currentUser.uid;
    const text = data.text;
    // this.afs.collection('posts').add(data);
    // this.conversationsCollection.doc('my-custom-id').set(data);
  }
}
