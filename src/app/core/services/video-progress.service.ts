import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { VideoProgress } from '../../shared/models/video-progress.model';

@Injectable({ providedIn: 'root' })
export class VideoProgressService {

  private apiUrl = `${environment.apiUrl}/video`;

  constructor(private http: HttpClient) {}

  trackProgress(data: VideoProgress) {
    return this.http.post(`${this.apiUrl}/track`, data);
  }
}