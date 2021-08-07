import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: String;
  password!: String;

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user)
        this.router.navigate(['/dashboard'])
      } else
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 })
    })
  }
}
