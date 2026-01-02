import { AnalysisResponse, AnalyzeResumeInput, CreateResumeInput } from 'src/generated/models';
import OpenAI from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './resume.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, BadRequestException } from '@nestjs/common';


@Injectable()
export class ResumeService {
  private  openai : OpenAI;

  constructor(
    @InjectModel(Resume.name)
    private resumeModel: Model<ResumeDocument>,
  ) {
    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Create a new resume
  async create(createResumeInput: CreateResumeInput,userId : string): Promise<ResumeDocument> {
    const { file, filename }= createResumeInput;
    const { createReadStream, mimetype } = await file;

    // Validate file type
    if( !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(mimetype)) {
        throw new BadRequestException('Only PDF and DOCX files supported');
    }

    // Parse file content
    const chunks : Buffer[] = [];
    for await (const chunk of createReadStream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    let rawText = '';
    
// Enhanced create method with DOCX support
if (mimetype === 'application/pdf') {
   const pdfParse = require('pdf-parse');  
      const data = await pdfParse(buffer);
  rawText = data.text;
} else if (mimetype.includes('word') || mimetype.includes('document')) {
  const mammoth = await import('mammoth');
  const result = await mammoth.default.extractRawText({ buffer });
  rawText = result.value;
} else {
  rawText = buffer.toString('utf-8');
}


    const resume = new this.resumeModel({
      userId,
      filename,
      rawText: rawText.trim(),
    });

    return resume.save()
  }

  async analyze(analyzeResumeInput: { resumeId : string; jobDescription?: string }): Promise<AnalysisResponse> {
    const { resumeId, jobDescription } = analyzeResumeInput;
    const resume = await this.resumeModel.findById(resumeId);

    if(!resume){
        throw new BadRequestException('Resume not found');
    }

    const prompt = `Analyze the following resume and provide an ATS score, keywords, suggestions for improvement, and strengths.${jobDescription ? ` Also, consider the following job description: ${jobDescription}` : ''}\n\nResume Text:\n${resume.rawText}
    
    Provide the response in the following JSON format:
    {
      "atsScore": number (0-100),
      "keywords": [array of strings],
      "suggestions": [array of strings],
      "strengths": [array of strings]
      "confidence": number (0-1)
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-5.2-chat-latest',
      messages: [
        { role: 'system', content: 'You are an expert resume analyzer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 600,
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');

    // save to history
    resume.analyses.push({
      analysisId: uuidv4(),
      atsScore: analysis.atsScore || 0,
      keywords: analysis.keywords || [],
      suggestions: analysis.suggestions || [],
      strengths: analysis.strengths || [],
      createdAt: new Date(),
    });

    resume.save();

    return {
      atsScore: analysis.atsScore || 0,
      keywords: analysis.keywords || [],
      suggestions: analysis.suggestions || [],
      strengths: analysis.strengths || [],
      confidence: analysis.confidence || 0,
    };
  }

  async findAllByUser(userId: string): Promise<ResumeDocument[]> {
    return this.resumeModel.find({ userId }).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<ResumeDocument | null> {
    return this.resumeModel.findById(id);
  }

  async remove(id: string): Promise<boolean> {
    await this.resumeModel.findByIdAndDelete(id);
    return true;
  }
 
}
