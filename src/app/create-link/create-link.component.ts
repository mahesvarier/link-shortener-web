import { Component } from '@angular/core';
import { LinkService } from '../link.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent {
  originalUrl: string = '';
  shortUrl: string | null = null;
  baseUrl: string = 'http://localhost:4200/';

  constructor(private linkService: LinkService, private router: Router) { }

  createShortLink(): void {
    this.linkService.addLink({ originalUrl: this.originalUrl }).subscribe(response => {
      console.log("🚀 ~ CreateLinkComponent ~ this.linkService.addLink ~ response:", response)
      this.shortUrl = this.baseUrl + response.shortenedUrl;
    });
  }
}
