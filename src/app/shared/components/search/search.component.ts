// src/app/search/search.component.ts
import { Component } from '@angular/core';
import { LinkedInService } from '../../services/linkedin.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';
  results: any[] = [];

  constructor(private linkedInService: LinkedInService) {}

  search() {
    this.linkedInService.searchLinkedIn(this.searchTerm, 1).subscribe(
      (data) => {
        this.results = data;
        console.log(this.results);
      },
      (error) => {
        console.error('Erreur lors de la recherche:', error);
      }
    );
  }
}
