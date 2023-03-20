import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],      
      useFactory:(config: ConfigService) => {
        return {
          uri:config.get<string>('MONGODB_URL_ROOT'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],      
    }),
  ],
})
export class DatabaseModule {}
