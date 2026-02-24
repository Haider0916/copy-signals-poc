import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

interface IMessagePayload {
    text: string;
    messageId: number;
    chatId: number;
    source: 'telegram';
}

@Injectable()
export class TelegramService {

    constructor(
        private readonly eventEmitter: EventEmitter2
    ) { }

    private readonly logger = new Logger(TelegramService.name)

    handleIncomingMessage(messagePayload: IMessagePayload) {
        this.logger.log(`Received message from [${messagePayload.source}]:`, messagePayload);

        this.eventEmitter.emit("message.received", messagePayload)

        this.logger.debug(
            `Emitted message.received event`, {
            ...messagePayload
        })
    }
}
