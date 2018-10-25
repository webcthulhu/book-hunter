import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { slideInOutAnimation } from '../animations';

import { ChatService } from '../chat.service';

interface Message {
  title: string;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ slideInOutAnimation ]
})
export class ChatComponent implements OnInit {
  @HostBinding('@slideInOutAnimation') '';
  form: FormGroup;
  messages: Observable<Message[]>;
  // users;
  constructor(private fb: FormBuilder, private chat: ChatService) {
    // this.store.messages$.subscribe(res => {
    //   if (!res) { return; }
    //   this.messages = res;
    // });
    // this.store.user$.subscribe(res => {
    //   if (!res) { return; }
    //   this.id = res.id;
    // });
    // this.chat.getProfiles().subscribe(res => {
    //   if (!res) { return; }
    //   this.users = res;
    // });
  }
  ngOnInit() {
    this.form = this.fb.group({
      text: [null, [Validators.required, Validators.minLength(3)]]
    });
    this.messages = this.chat.messages$;
  }
  onFormSubmit(model) {
    this.chat.addMessage(model);
  }
  // createConversation(id) {
  //   this.chat.createConversation(id);
  // }
}
