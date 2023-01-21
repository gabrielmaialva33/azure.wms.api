import { Knex } from 'knex';
import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BaseEntity } from '@/core/entities/base.entity';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        Model: BaseEntity,
        config: { ...config.get<Knex.Config>('database') },
      }),
    }),
    ObjectionModule.forFeature([BaseEntity]),
  ],
  exports: [ObjectionModule],
})
export class OrmModule {}
