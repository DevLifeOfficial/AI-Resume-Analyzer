import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ResumeService } from './resume.service';
import { CreateResumeInput } from 'src/generated/models';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver('Resume')
@UseGuards(GqlAuthGuard)
export class ResumeResolver {
  constructor(private readonly resumeService: ResumeService) {}

  @Mutation('uploadResume')
  create(@Args('createResumeInput') createResumeInput: CreateResumeInput, @Context() ctx:any) {
    const userId = ctx.req.user.userId;
    return this.resumeService.create(createResumeInput,userId);
  }

  @Mutation('analyzeResume')
  analyze(@Args('resumeId') resumeId: string, @Args('jobDescription' ,{ nullable: true }) jobDescription?: string) {
    return this.resumeService.analyze({ resumeId, jobDescription });
  }

  @Query('myResumes')
  findAllByUser(@Context() ctx:any) {
    const userId = ctx.req.user.userId;
    return this.resumeService.findAllByUser(userId);
  }

  @Query('resume')
  findOne(@Args('id') id: string) {
    return this.resumeService.findOne(id);
  }

  @Mutation('deleteResume')
  remove(@Args('id') id: string) {
    return this.resumeService.remove(id);
  }

}
