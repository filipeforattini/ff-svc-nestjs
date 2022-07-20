import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { getConnection } from 'typeorm';
import { Lead } from '../entities/lead.entity';

@Controller('leads')
export class LeadsController {
  @Get()
  findAll() {
    return getConnection('cn1').getRepository(Lead).find();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return getConnection('cn1')
      .getRepository(Lead)
      .findOne(+id);
  }
  @Post()
  create(@Body() lead: Lead) {
    return getConnection('cn1').getRepository(Lead).create(lead);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() lead: Lead) {
    const obj = await getConnection('cn1')
      .getRepository(Lead)
      .findOne(+id);

    Object.entries(lead).forEach(([k, v]) => (obj[k] = v));
    await getConnection('cn1').getRepository(Lead).update(id, obj);

    return obj;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return getConnection('cn1').getRepository(Lead).softDelete(id);
  }
}
