import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ScrapingService } from '../../services/scraping.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  scrapedData: any[] = [];
  additionalContent: any = {};
  showScrapedContent: boolean = false;

  constructor(
    private authService: AuthService,
    private scrapingService: ScrapingService,
    private router: Router
  ) {}

  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    // Subscribe to route changes
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is `/dashboard`
        this.showScrapedContent = event.urlAfterRedirects === '/dashboard';
        
        // Fetch scraped data only when on the /dashboard route
        if (this.showScrapedContent) {
          this.fetchScrapedData();
        } else {
          this.scrapedData = [];
        }
      }
    });

    // Fetch additional content
    this.fetchAdditionalContent();
  }

  fetchScrapedData(): void {
    this.scrapingService.getScrapedData().subscribe(
      data => {
        if (Array.isArray(data)) {
          this.scrapedData = data;
        } else {
          console.error('Expected an array but received:', data);
        }
      },
      error => {
        console.error('Error fetching scraped data:', error);
      }
    );
  }

  fetchAdditionalContent(): void {
    this.scrapingService.getAdditionalContent().subscribe(
      data => {
        this.additionalContent = data;
      },
      error => {
        console.error('Error fetching additional content:', error);
      }
    );
  }
}
