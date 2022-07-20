import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pageview {
  constructor(data: any) {
    this.id = data?.id;
    this.ip = data?.ip;
    this.page = data?.page;
    this.query = data?.query;
  }


  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  ip: string;

  @ApiProperty()
  @Column()
  page: string;

  @ApiProperty()
  @Column()
  query: string;
}
