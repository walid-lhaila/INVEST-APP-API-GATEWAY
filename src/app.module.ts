import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { PostsModule } from './Posts/posts.module';
import { ProjectsModule } from './Projects/projects.module';
import { MessagesModule } from './Messages/messages.module';

@Module({
  imports: [AuthModule, PostsModule, ProjectsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
