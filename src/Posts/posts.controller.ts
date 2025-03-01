import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
  UseInterceptors,
  UploadedFile,
  Get, Delete, Param, Put
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { Express } from 'express';

@Controller('posts')
export class PostsController {
  constructor(@Inject('Posts-Service') private readonly postsService: ClientProxy) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async createPost(@Body() postsDto: any, @Headers('authorization') token: string, @UploadedFile() file: Express.Multer.File,) {
    if (!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    let fileBuffer: Buffer | undefined;
    if (file) {
      fileBuffer = await this.readFileAsBuffer(file.path);
    }
    const payload = {
      token,
      payload: postsDto,
      file: fileBuffer
        ? {
            buffer: fileBuffer.toString('base64'),
            originalname: file.originalname,
            mimetype: file.mimetype,
          }
        : undefined,
    };
    return this.postsService.send({ cmd: 'createPost' }, payload);
  }

  @Get('getAll')
   getAllPosts() {
    return this.postsService.send({ cmd: 'getAll' }, {}).toPromise();
  }

  @Get('getAllPostsByUserId')
  getAllPostsByUserId(@Headers('authorization') token: string) {
    return this.postsService
      .send({ cmd: 'getAllPostsByUserId' }, { token })
      .toPromise();
  }

  @Delete('delete/:postId')
  async deletePost(@Param('postId') postId: string, @Headers('authorization') token: string) {
      if(!token) {
        throw  new UnauthorizedException('TOKEN IS REQUIRED');
      }
    return this.postsService.send({ cmd: 'deletePost' }, {token, postId}).toPromise();
  }

  @Put('update/:postId')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async updatePost(@Param('postId') postId: string,  @Body() updateData: any,  @Headers('authorization') token: string, @UploadedFile() file: Express.Multer.File) {
    if(!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    let fileBuffer: Buffer | undefined;
    if(file) {
      fileBuffer = await this.readFileAsBuffer(file.path);
    }

    const payload = {
      token,
      postId,
      payload: updateData,
      file: fileBuffer ? {
        buffer: fileBuffer.toString('base64'),
        originalname: file.originalname,
        mimetype: file.mimetype
      } : undefined,
    };


    return this.postsService.send({ cmd: 'updatePost' }, payload).toPromise();
  }


  private async readFileAsBuffer(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const stream = createReadStream(filePath);
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
