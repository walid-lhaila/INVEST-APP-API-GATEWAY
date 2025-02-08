import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { PostsModule } from './Posts/posts.module';
import {ProjectsModule} from "./Projects/projects.module";

@Module({
  imports: [AuthModule, PostsModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
