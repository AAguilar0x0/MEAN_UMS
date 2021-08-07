import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  name!: String;
  email!: String;
  username!: String;
  password!: String;
  private id!: String;
  private user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.id = this.user.id;
    this.name = this.user.name
    this.email = this.user.email
    this.username = this.user.username
    this.password = "";
  }

  onEditSubmit() {
    let user = {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    this.authService.updateUser(user).subscribe(res => {
      if (res.success) {
        this.user.name = this.name;
        this.user.email = this.email;
        this.user.username = this.username;
        localStorage.setItem('user', JSON.stringify(this.user))
        this.flashMessagesService.show('User Updated Successful', { cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['/profile'])
      }
    }, err => {
      console.log(err.msg)
    })
  }
}
