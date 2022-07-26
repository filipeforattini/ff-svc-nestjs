import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'leads' })
export class Lead {
  constructor(data: any) {
    this.id = data?.id;
    this.ip = data?.ip;
    this.name = data?.name;
    this.email = data?.email;
    this.mobile = data?.mobile;
    this.country = data?.country;
    this.state = data?.state;
    this.city = data?.city;
    this.address = data?.address;
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
  name: string;

  @ApiProperty()
  @Column({
    length: 64,
  })
  email: string;

  @ApiProperty()
  @Column({
    length: 32,
  })
  mobile: string;

  @ApiProperty()
  @Column({
    length: 64,
  })
  country: string;

  @ApiProperty()
  @Column({
    length: 32,
  })
  state: string;

  @ApiProperty()
  @Column({
    length: 64,
  })
  city: string;

  @ApiProperty()
  @Column({
    length: 256,
  })
  address: string;

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
