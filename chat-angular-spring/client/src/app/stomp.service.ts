import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { Subject } from 'rxjs';

export interface ChatMessage { user: string; text: string; ts: number; }

@Injectable({ providedIn: 'root' })
export class StompService {
  private client!: Client;
  messages$ = new Subject<ChatMessage>();

  connect(serverUrl = 'http://localhost:8080/ws') {
    const sock = new SockJS(serverUrl);
    this.client = over(sock);
    this.client.connect({}, () => {
      this.client.subscribe('/topic/messages', (frame) => {
        const msg = JSON.parse(frame.body) as ChatMessage;
        this.messages$.next(msg);
      });
    });
  }

  send(text: string, user: string) {
    const payload = { user, text, ts: Date.now() };
    this.client.send('/app/chat', {}, JSON.stringify(payload));
  }
}
