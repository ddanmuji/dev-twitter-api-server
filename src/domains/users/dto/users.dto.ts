import { ApiProperty, PickType } from '@nestjs/swagger';

import { User } from '../users.schema';

export class ReadOnlyUserDto extends PickType(User, ['email', 'nickname'] as const) {
	@ApiProperty({ example: '6442ba0282f3eae0cfe1a796', description: 'unique id' })
	id: string;
}
