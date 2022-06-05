import { ApiProperty } from '@nestjs/swagger';

export class rentBook {
  @ApiProperty()
  bookId: number;
  @ApiProperty()
  userId: number;
}
