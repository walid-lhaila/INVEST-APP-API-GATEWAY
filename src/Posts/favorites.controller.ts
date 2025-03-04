import {
  Body,
  Headers,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('favorites')
export class FavoritesController {
  constructor(
    @Inject('Posts-Service') private readonly postService: ClientProxy,
  ) {}

  @Post('add')
  async addFavorite(
    @Body() favoriteDto: { postId: string },
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    const payload = {
      token,
      payload: favoriteDto,
    };
    return this.postService.send({ cmd: 'addFavorite' }, payload);
  }

  @Get('get')
  async getFavorites(@Headers('authorization') token: string) {
    if (!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    const payload = {
      token,
    };
    return this.postService
      .send({ cmd: 'getFavoritesByUser' }, payload)
      .toPromise();
  }

  @Delete('remove/:favoriteId')
  async removeFavorite(
    @Param('favoriteId') favoriteId: string,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    const payload = {
      token,
      favoriteId,
    };
    return this.postService
      .send({ cmd: 'removeFavorite' }, payload)
      .toPromise();
  }
}
