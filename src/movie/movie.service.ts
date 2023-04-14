import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MovieService {
  constructor(private config: ConfigService) {}

  async fetchAllMovies() {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${this.config.get(
      'TMDB_API_KEY',
    )}`;
    const response = await axios.get(url);
    return response.data;
  }
}
