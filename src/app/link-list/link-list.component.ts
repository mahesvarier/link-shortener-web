import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit{
  links: string[] = [];
  baseUrl: string = 'http://localhost:4200/';

  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
    this.linkService.getAllLinks().subscribe(data => {
      this.links = data.map((link: string) => this.baseUrl + link);
    });
  }
}
