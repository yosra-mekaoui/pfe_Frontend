import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {
  private apiUrl = 'http://localhost:5000/api/scrape-deloitte';
  private additionalContentUrl = 'http://localhost:5000/api/scrapeAdditionalContent';
  constructor(private http: HttpClient) {}

  getScrapedData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getAdditionalContent(): Observable<any> {
    return this.http.get<any>(this.additionalContentUrl);
  }

}