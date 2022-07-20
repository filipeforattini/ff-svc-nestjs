import { Cron } from '@nestjs/schedule';
import { faker } from '@faker-js/faker';
import { getConnection } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { Lead } from 'src/entities/lead.entity';
import { Pageview } from 'src/entities/pageview.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly queue: AmqpConnection) {}

  @Cron('* * * * * *')
  async handleCron() {
    const pageview = this.randomPageview();

    try {
      await this.queue.publish('pageviews', 'new', new Pageview(pageview));
    } catch (error) {
      this.logger.error(error);
    }

    if (faker.datatype.number({ min: 0, max: 10 }) === 0) {
      const lead = this.randomLead();
      lead.ip = pageview.ip;
      try {
        await this.queue.publish('leads', 'new', new Lead(lead));
      } catch (error) {
        this.logger.error(error);
      }
    }
  }

  randomPageview() {
    return {
      ip: faker.internet.ip(),
      page: faker.internet.url(),
      query: `?q=${faker.lorem.word()}`,
    };
  }

  randomLead() {
    return {
      ip: null,
      name: faker.name.findName(),
      mobile: faker.phone.number('(##)#####-####'),
      country: faker.address.country(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      address: faker.address.streetAddress(),
    };
  }

  @RabbitSubscribe({
    exchange: 'pageviews',
    routingKey: 'new',
    queue: 'pageviews.new',
  })
  createPageview(pageview: Pageview) {
    return getConnection('cn2').getRepository(Pageview).save(pageview);
  }

  @RabbitSubscribe({
    exchange: 'leads',
    routingKey: 'new',
    queue: 'leads.new',
  })
  createLead(lead: Lead) {
    return getConnection('cn2').getRepository(Lead).save(lead);
  }
}
