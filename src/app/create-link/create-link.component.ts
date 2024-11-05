import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseUrl } from 'src/config/config';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {
  linkForm!: FormGroup;
  originalUrl: string = '';
  shortUrl: string | null = null;
  baseUrl: string = baseUrl;
  isLoading: boolean = false;

  constructor(private linkService: LinkService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.linkForm = this.fb.group({
      originalUrl: ['', [Validators.required, Validators.pattern('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$')]]
    });
  }

  createShortLink(): void {
    if (this.linkForm.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.linkForm.valid) {
      const originalUrl = this.linkForm.value.originalUrl;
      this.linkService.addLink({ originalUrl }).subscribe(response => {
        console.log("🚀 ~ CreateLinkComponent ~ this.linkService.addLink ~ response:", response);
        this.shortUrl = this.baseUrl + response.shortenedUrl;
        this.isLoading = false;
      },
        error => {
          console.error('Error creating short URL', error);
          this.isLoading = false;
        });
    }
  }
}
