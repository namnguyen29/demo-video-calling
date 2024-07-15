import { environment } from '@app-environments/environment';
import axios, { AxiosInstance } from 'axios';

export class HttpConfig {
  private readonly http!: AxiosInstance;

  constructor(public apiUrl: string) {
    this.http = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public get httpInstance(): AxiosInstance {
    return this.http;
  }
}

export const http = new HttpConfig(environment.baseUrl).httpInstance;
