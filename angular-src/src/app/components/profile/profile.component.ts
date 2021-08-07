import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user
    },
      err => {
        console.log(err)
        return false;
      });
  }

  onDeleteClick() {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.authService.deleteUser({ id: user.id }).subscribe(res => {
      if (res.success) {
        this.authService.logout();
        this.flashMessagesService.show('User Deleted Successful', { cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['/'])
      }
    }, err => {
      console.log(err.msg)
      return false;
    });
  }
}
