import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramAdapter } from './telegram.adapter';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          token: config.getOrThrow<string>("TELEGRAM_BOT_TOKEN")
        }
      }
    })
  ],
  providers: [
    TelegramService,
    TelegramAdapter,
  ]
})
export class TelegramModule { }
