import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('Logout Successful', { cssClass: 'alert-success', timeout: 3000 })
    this.router.navigate(['/login'])
  }
}
