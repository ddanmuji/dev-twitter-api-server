import { ApiProperty } from '@nestjs/swagger';

export class TweetQueryDto {
	@ApiProperty({
		example: '12',
		default: '10',
		description: '반환할 트윗의 갯수를 지정합니다. (기본값: 10)'
	})
	limit: string;

	@ApiProperty({
		example: '24',
		default: '0',
		description: '조회할 트윗의 시작 위치를 지정합니다. (기본값: 0)'
	})
	skip: string;
}
