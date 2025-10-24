package com.example.chat;

public class Message {
    private String user;
    private String text;
    private long ts;

    public Message() {
    }

    public Message(String user, String text, long ts) {
        this.user = user;
        this.text = text;
        this.ts = ts;
    }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public long getTs() { return ts; }
    public void setTs(long ts) { this.ts = ts; }
}
