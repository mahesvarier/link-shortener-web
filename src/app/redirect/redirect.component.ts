import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-redirect',
  template: '<p>Redirecting...</p>',
  styles: []
})
export class RedirectComponent implements OnInit {
  originalUrl: string | null = null;
  constructor(private route: ActivatedRoute, private linkService: LinkService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log("🚀 ~ RedirectComponent ~ ngOnInit ~ params:", params)
      const shortUrl = params.keys.length ? params.get(params.keys[0]) : null;
      console.log("🚀 ~ RedirectComponent ~ ngOnInit ~ shortUrl:", shortUrl)
      if (shortUrl) {
        this.linkService.getOriginalUrl(shortUrl).subscribe(originalUrl => {
          console.log("🚀 ~ RedirectComponent ~ this.linkService.getOriginalUrl ~ originalUrl:", originalUrl)
          let url = String(originalUrl.originalUrl);
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
          }
          this.originalUrl = url;

          if (this.originalUrl) {
            window.location.href = this.originalUrl;
          } else {
            console.error("Original URL is not set.");
          }
        });
      }
    });
  }
}