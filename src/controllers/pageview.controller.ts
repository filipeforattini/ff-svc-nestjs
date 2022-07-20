import { getConnection } from 'typeorm';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { Pageview } from '../entities/pageview.entity';

@Controller('pageviews')
export class PageviewController {
  @Get()
  findAll() {
    return getConnection('cn2').getRepository(Pageview).find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return getConnection('cn2')
      .getRepository(Pageview)
      .findOne(+id);
  }

  @Post()
  create(@Body() pageview: Pageview) {
    return getConnection('cn2').getRepository(Pageview).save(pageview);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() pageview: Pageview) {
    const obj = await getConnection('cn2')
      .getRepository(Pageview)
      .findOne(+id);

    Object.entries(pageview).forEach(([k, v]) => (obj[k] = v));
    await getConnection('cn2').getRepository(Pageview).update(id, obj);

    return obj;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return getConnection('cn2').getRepository(Pageview).delete(id);
  }
}
