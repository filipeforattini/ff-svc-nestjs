import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pageviews' })
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
  @Column({
    length: 32,
  })
  ip: string;

  @ApiProperty()
  @Column({
    length: 64,
  })
  page: string;

  @ApiProperty()
  @Column({
    length: 256,
  })
  query: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
