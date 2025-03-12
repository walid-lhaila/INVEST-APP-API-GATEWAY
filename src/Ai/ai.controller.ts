import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('ai')
export class AiController {
  constructor(@Inject('Ai-Service') private readonly aiService: ClientProxy) {}

  @Post('suggestions')
  async getSuggestion(@Body('input') input: string) {
    try {
      const response = await this.aiService
        .send('generate_suggestions', { input })
        .toPromise();
      return response;
    } catch (error) {
      console.error('Error communicating with AI microservice:', error);
      throw new Error('Failed to get AI suggestions');
    }
  }

  @Post('generateTagsAndCategories')
  async getTagsAndCategories(@Body('description') description: string) {
    try {
      const response = await this.aiService
        .send('generate-tags-categories', { description })
        .toPromise();
      return response;
    } catch (error) {
      console.error('Error communicating with AI microservice:', error);
      throw new Error('Failed to get AI suggestions');
    }
  }
}
