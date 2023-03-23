import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums';


export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstName!: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName!: string;

  @Prop({
    type: String,
    required: false,
  })
  middleName?: string;

  @Prop({
    type: String,
    required: true,
  })
  country!: string;

  @Prop({
    type: String,
    required: true,
  })
  state!: string;

  @Prop({
    type: String,
    required: true,
  })
  address!: string;

  @Prop({
    type: String,
    required: false,
  })
  postalCode?: string;

  @Prop({
    type: String,
    required: false,
    enum: Role,
    default: Role.User
  })
  role?: string;

  @Prop({
    type: String,
    required: true,
  })
  phone!: string; 

  @Prop({
    type: String,
    required: false,
  })
  avatar?: string;

  @Prop({
    type: String,
    required: true,
  })
  password!: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  email!: string;

  @Prop({
    type: Boolean,
    required: false,
    default:false
  })
  IsLoggedIn?:boolean;

  @Prop({
    type: Boolean,
    required: false,
    default:false
  })
  IsVerified?:boolean;

  @Prop({
    type: String,
    required: false,
    unique:true
  })
  username?:string;  

}

export const UserSchema = SchemaFactory.createForClass(User);