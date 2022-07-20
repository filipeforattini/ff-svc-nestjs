import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lead {
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
