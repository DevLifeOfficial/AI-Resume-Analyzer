import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeResolver } from './resume.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from './resume.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Resume.name, schema:ResumeSchema }])
  ],
  providers: [ResumeResolver, ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
