import { Cron } from '@nestjs/schedule';
import { faker } from '@faker-js/faker';
import { RMQService } from 'nestjs-rmq';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly queue: RMQService) {}

  @Cron('* * * * * *')
  async handleCron() {
    const pageview = this.createPageview();
    console.log({ pageview });

    try {
      await this.queue.send<number[], number>('pageviews.new', [1, 2, 3], {
        expiration: 1000,
        priority: 1,
        persistent: true,
        timeout: 5 * 1000,
      });
      // await this.queue.notify<string>('pageview', 'XXXXX');
    } catch (error) {
      this.logger.error(error);
      console.error(error);
    }

    if (faker.datatype.number({ min: 0, max: 10 }) === 0) {
      const lead = this.createLead();
      lead.ip = pageview.ip;
      // console.log({ lead });
      // this.broker.sendToChannel("leads.new", lead);
    }
  }

  createPageview() {
    return {
      ip: faker.internet.ip(),
      page: faker.internet.url(),
      query: `?q=${faker.lorem.word()}`,
    };
  }

  createLead() {
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
}
