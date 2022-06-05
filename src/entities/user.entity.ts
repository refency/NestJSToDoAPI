import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Book } from './book.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: false })
  @Column()
  name: string;

  @ApiProperty({ required: false })
  @Column()
  surname: string;

  @ApiProperty({ required: false })
  @Column({ default: false })
  pass: boolean;

  @OneToMany(() => Book, (book) => book.user)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
