import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@wiremon';
import { SchemaTypes } from 'mongoose';

export type resetPasswordDocument = resetPassword & Document;

@Schema({
  timestamps: true,
})
export class resetPassword {

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  email!: string;  

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isvalied!: boolean;

  @Prop({
    type: String,
    required: true,
  })
  token!: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
  user!: string | User;

}

export const resetPasswordSchema = SchemaFactory.createForClass(resetPassword);