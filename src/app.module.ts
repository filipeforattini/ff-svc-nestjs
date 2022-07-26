import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import * as dotenvExpand from 'dotenv-expand';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { GeneratorService } from './services/generator.service';
import { LeadsController } from './controllers/leads.controller';
import { PageviewController } from './controllers/pageview.controller';

dotenvExpand.expand(dotenv.config());

const {
  MYSQL_CONNECTION_STRING,
  POSTGRES_CONNECTION_STRING,
  RABBITMQ_CONNECTION_STRING,
  RABBITMQ_PREFETCH = '3',
} = process.env;

const TYPEDB = {
  mysql: 'mysql',
  postgresql: 'postgres',
};

const getTypeFromString = (str) => TYPEDB[str.split('://')[0]];

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'cn1',
      type: getTypeFromString(
        POSTGRES_CONNECTION_STRING || MYSQL_CONNECTION_STRING,
      ),
      synchronize: true,
      autoLoadEntities: true,
      entities: ['dist/**/pageview.entity{.ts,.js}'],
      url: POSTGRES_CONNECTION_STRING || MYSQL_CONNECTION_STRING,
    }),
    TypeOrmModule.forRoot({
      name: 'cn2',
      type: getTypeFromString(
        MYSQL_CONNECTION_STRING || POSTGRES_CONNECTION_STRING,
      ),
      synchronize: true,
      autoLoadEntities: true,
      entities: ['dist/**/lead.entity{.ts,.js}'],
      url: MYSQL_CONNECTION_STRING || POSTGRES_CONNECTION_STRING,
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: RABBITMQ_CONNECTION_STRING,
      prefetchCount: parseInt(RABBITMQ_PREFETCH),
      enableControllerDiscovery: true,
      exchanges: [
        {
          name: 'pageviews',
          type: 'fanout',
        },
        {
          name: 'leads',
          type: 'fanout',
        },
      ],
    }),
  ],
  providers: [GeneratorService],
  controllers: [LeadsController, PageviewController],
})
export class AppModule {}
