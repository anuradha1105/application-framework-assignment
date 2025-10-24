import { Component, OnInit } from '@angular/core';
import { StompService, ChatMessage } from './stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = 'User' + Math.floor(Math.random() * 1000);
  text = '';
  messages: ChatMessage[] = [];

  constructor(private stomp: StompService) {}

  ngOnInit() {
    this.stomp.connect();
    this.stomp.messages$.subscribe(m => this.messages.push(m));
  }

  send() {
    if (!this.text.trim()) return;
    this.stomp.send(this.text, this.user);
    this.text = '';
  }
}
