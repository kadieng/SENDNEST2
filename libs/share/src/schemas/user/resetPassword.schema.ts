import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    type: String,
    required: true,

  })
  otp!: string;

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

}

export const resetPasswordSchema = SchemaFactory.createForClass(resetPassword);