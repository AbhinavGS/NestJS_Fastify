import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}
  @Get('all')
  fetchMovie() {
    return this.movieService.fetchAllMovies();
  }
}
