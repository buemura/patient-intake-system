import { ApiProperty } from '@nestjs/swagger';

export class FollowUpForm {
  @ApiProperty()
  fields: Record<string, any>;
}
