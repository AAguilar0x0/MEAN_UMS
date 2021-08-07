import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  password!: String;
  dataRegister: any = {};

  constructor(private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(): void {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('User Registration Successfully', { cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('User Registration Failed', { cssClass: 'alert-danger', timeout: 3000 })
      }
    })
  }
}
