import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    TelegramModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EventEmitterModule.forRoot({
      delimiter: '.',
      maxListeners: 10
    }),
  ]
})
export class AppModule { }