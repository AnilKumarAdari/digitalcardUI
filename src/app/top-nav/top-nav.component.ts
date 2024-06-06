import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css',
})
export class TopNavComponent {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private route: Router
  ) {}
  logout() {
    this.authService.logout();
    this.storageService.clean();
    this.route.navigate(['login']);
  }
}
