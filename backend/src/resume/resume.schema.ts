

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true})
export class Resume extends Document {

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true})
    userId : string;

    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    rawText : string;

    @Prop({
        type:[{
        analysisId: String,
        atsScore: Number,
        keywords: [String],
        suggestions: [String],
        strengths: [String],
        createdAt: Date,
        }],
        default: []
    })
    analyses: Array<{
        analysisId: string;
        atsScore: number;
        keywords: string[];
        suggestions: string[];
        strengths: string[];
        createdAt: Date;
    }>;
    
}   

export type ResumeDocument  = HydratedDocument<Resume>; ;
export const ResumeSchema = SchemaFactory.createForClass(Resume);