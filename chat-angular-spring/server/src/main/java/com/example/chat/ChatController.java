package com.example.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")      // client sends to /app/chat
    @SendTo("/topic/messages")    // server broadcasts to /topic/messages
    public Message handle(Message inbound) {
        // just bounce the same message back out
        return inbound;
    }
}
