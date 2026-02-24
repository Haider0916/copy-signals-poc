import { Injectable, Logger } from '@nestjs/common';

interface IMessagePayload {
    text: string;
    messageId: number;
    chatId: number;
    source: 'telegram';
}

@Injectable()
export class TelegramService {

    private readonly logger = new Logger(TelegramService.name)

    async handleIncomingMessage(messagePayload: IMessagePayload): Promise<any> {
        this.logger.log(`Received message from telegram:`, messagePayload);
        return;
    }
}
