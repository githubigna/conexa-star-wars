import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  userId: string;
  @ApiProperty()
  @Prop()
  userName: string;
  @Prop()
  @ApiProperty()
  email: string;
  @Prop()
  @ApiProperty()
  password: string;
  @Prop()
  @ApiProperty()
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
