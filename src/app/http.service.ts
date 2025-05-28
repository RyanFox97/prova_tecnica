import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(private readonly http: HttpClient) {}

  get(path: string){ return this.http.get(path); }
}
