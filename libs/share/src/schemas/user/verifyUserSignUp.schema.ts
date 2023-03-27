import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VerifyUserSignupDocument = VerifyUserSignup & Document;

@Schema({
    timestamps: true,
})
export class VerifyUserSignup {

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

}

export const VerifyUserSignupSchema = SchemaFactory.createForClass(VerifyUserSignup);