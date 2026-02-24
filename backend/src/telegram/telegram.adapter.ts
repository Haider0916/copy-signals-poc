import { Logger } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { On, Update, Context } from 'nestjs-telegraf';

@Update()
export class TelegramAdapter {
  constructor(private readonly telegramService: TelegramService) { }

  private readonly logger = new Logger(TelegramAdapter.name)

  @On('text')
  async onText(@Context() ctx) {
    const MessageText = ctx.message.text;
    const MessageId = ctx.message.message_id;
    const ChatId = ctx.chat.id;

    if (!MessageText || !MessageId || !ChatId) {
      this.logger.warn(`Received missing fields from ${TelegramAdapter.name}`, {
        MessageTextReceived: !!MessageText,
        MessageIdReceived: !!MessageId,
        ChatIdReceived: !!ChatId
      })
      return;
    }

    this.logger.log(
      `Received message from [Telegram]:`, {
      MessageText,
      MessageId,
      ChatId
    })

    this.telegramService.handleIncomingMessage({
      text: MessageText,
      messageId: MessageId,
      chatId: ChatId,
      source: 'telegram'
    })
  }
}
