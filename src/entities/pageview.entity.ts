import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pageview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  page: string;

  @Column()
  query: string;
}
