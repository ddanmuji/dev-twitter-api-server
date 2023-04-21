import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true
};

@Schema(options)
export class User extends Document {
	@Prop({ required: true, unique: true })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	nickname: string;

	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	password: string;

	@Prop()
	@IsString()
	avatarImgSrc: string;

	readonly readonlyData: {
		id: string;
		email: string;
		name: string;
	};
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readonlyData').get(function (this: User) {
	return {
		id: this.id,
		email: this.email,
		nickname: this.nickname
	};
});
