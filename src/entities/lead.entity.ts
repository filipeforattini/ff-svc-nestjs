import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lead {
  constructor(data: any) {
    this.id = data?.id;
    this.name = data?.name;
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
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  mobile: string;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  address: string;
}
