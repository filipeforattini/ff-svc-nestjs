import * as dotenv from 'dotenv';
import { RMQModule, RMQService } from 'nestjs-rmq';
import { Module } from '@nestjs/common';
import * as dotenvExpand from 'dotenv-expand';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { LeadsController } from './controllers/leads.controller';
import { PageviewController } from './controllers/pageview.controller';
import { TasksService } from './services/task.service';

dotenvExpand.expand(dotenv.config());

const {
  AMQP_HOST,
  AMQP_LOGIN,
  AMQP_PASSWORD,
  MYSQL_CONNECTION_STRING,
  POSTGRES_CONNECTION_STRING,
  RABBITMQ_CONNECTION_STRING,
} = process.env;

const TYPEDB = {
  mysql: 'mysql',
  postgresql: 'postgres',
};

const getTypeFromString = (str) => TYPEDB[str.split('://')[0]];

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RMQModule.forRoot({
      logMessages: true,
      serviceName: 'RabbitMQ',
      messagesTimeout: 5 * 1000,
      exchangeName: 'ff-svc-nestjs',
      connections: [
        {
          // uri: RABBITMQ_CONNECTION_STRING,
          vhost: '',
          host: AMQP_HOST,
          login: AMQP_LOGIN,
          password: AMQP_PASSWORD,
        },
      ],
      assertExchangeType: 'fanout',
      exchangeOptions: {

      },
    }),
    TypeOrmModule.forRoot({
      name: 'cn1',
      type: getTypeFromString(
        POSTGRES_CONNECTION_STRING || MYSQL_CONNECTION_STRING,
      ),
      synchronize: true,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      url: POSTGRES_CONNECTION_STRING || MYSQL_CONNECTION_STRING,
    }),
    TypeOrmModule.forRoot({
      name: 'cn2',
      type: getTypeFromString(
        MYSQL_CONNECTION_STRING || POSTGRES_CONNECTION_STRING,
      ),
      synchronize: true,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      url: MYSQL_CONNECTION_STRING || POSTGRES_CONNECTION_STRING,
    }),
  ],
  providers: [TasksService],
  controllers: [LeadsController, PageviewController],
})
export class AppModule {}
