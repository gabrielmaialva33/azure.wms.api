import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { validate, ValidateSchema } from '@/core/libs/config/validate.config';
import { database } from '@/core/libs/config/database.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [database],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: ValidateSchema,
      validate: validate,
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
