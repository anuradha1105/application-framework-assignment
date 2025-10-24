import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

export interface ChatMessage { user: string; text: string; ts?: string }

@WebSocketGateway({
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  },
  namespace: '/'
})
export class ChatGateway {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log('Client connected', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id)
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: ChatMessage) {
    const msg: ChatMessage = { ...payload, ts: new Date().toISOString() }
    this.server.emit('message', msg)
    return msg
  }
}
