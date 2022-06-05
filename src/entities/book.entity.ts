import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: false })
  @Column()
  name: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
