import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

export interface TweetReadOnlyData {
	id: string;
	author: Types.ObjectId;
	tweet_text: string;
}

const options: SchemaOptions = {
	timestamps: true
};

@Schema(options)
export class Tweet extends Document {
	@ApiProperty({ description: 'Tweet 작성자 id' })
	@Prop({ type: Types.ObjectId, required: true, ref: 'users' })
	@IsNotEmpty()
	author: Types.ObjectId;

	@ApiProperty({
		example: '첫번째 트윗입니다!',
		description: '최대 280자까지의 짧은 메시지',
		required: true
	})
	@Prop({ required: true, maxlength: 280 })
	@IsNotEmpty()
	@IsString()
	@MaxLength(280)
	tweet_text: string;

	readonly readOnlyData: TweetReadOnlyData;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

TweetSchema.virtual('readOnlyData').get(function (this: Tweet): TweetReadOnlyData {
	return {
		id: this.id,
		author: this.author,
		tweet_text: this.tweet_text
	};
});
