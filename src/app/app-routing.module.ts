import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LinkListComponent } from './link-list/link-list.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'create', component: CreateLinkComponent },
  { path: 'list', component: LinkListComponent },
  { path: ':shortUrl', component: RedirectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
