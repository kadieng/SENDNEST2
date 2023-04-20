import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@wiremon';
import { SchemaTypes } from 'mongoose';

export type BeneficiariesDocument = Beneficiaries & Document;

@Schema({
    timestamps: true,
})
export class Beneficiaries {

    @Prop({
        type: String,
        required: true,
    })
    bankName!: string;

    @Prop({
        type: String,
        required: true,
    })
    accountName!: string;

    @Prop({
        type: String,
        required: true,
    })
    accountNumber!: string;

    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
    user!: string | User;
}

export const BeneficiariesSchema = SchemaFactory.createForClass(Beneficiaries);