import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
import { baseUrl } from 'src/config/config';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
  links: string[] = [];
  baseUrl: string = baseUrl;
  isLoading = true;

  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
    this.linkService.getAllLinks().subscribe(data => {
      this.links = data.map((link: string) => this.baseUrl + link);
      this.isLoading = false;
    }, error => {
      console.error('Error fetching links', error);
      this.isLoading = false;
    });
  }
}
