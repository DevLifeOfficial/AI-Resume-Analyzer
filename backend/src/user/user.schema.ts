import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; 

  @Prop()
  avatarUrl?: string;

  @Prop()
  authProvider?: string;

  @Prop()
  authProviderId?: string;

  @Prop({
    type: {
      googleId: String,
      linkedInId: String,
    },
  })
  oauth?: {
    googleId?: string;
    linkedInId?: string;
  };

  @Prop({
    type: String,
    enum: ['FREE', 'PRO', 'ENTERPRISE'],
    default: 'FREE',
  })
  plan: string;

  @Prop({
    type: {
      customerId: String,
      subscriptionId: String,
      status: String,
      renewalDate: Date,
    },
  })
  subscription?: {
    customerId?: string;
    subscriptionId?: string;
    status?: string;
    renewalDate?: Date;
  };

  @Prop({
    type: {
      totalScans: { type: Number, default: 0 },
      monthlyScans: { type: Number, default: 0 },
      dailyScans: { type: Number, default: 0 },
      lastScanDate: Date,
    },
  })
  usage?: {
    totalScans?: number;
    monthlyScans?: number;
    dailyScans?: number;
    lastScanDate?: Date;
  };

  @Prop({ default: 'USER' })
  role: string;

  @Prop({
    type: {
      darkMode: { type: Boolean, default: false },
      notificationOnAnalysisComplete: { type: Boolean, default: true },
      emailNotifications: { type: Boolean, default: true },
      language: { type: String, default: 'en' },
    },
  })
  setting?: {
    darkMode?: boolean;
    notificationOnAnalysisComplete?: boolean;
    emailNotifications?: boolean;
    language?: string;
  };

  @Prop()
  linkedInUrl?: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
