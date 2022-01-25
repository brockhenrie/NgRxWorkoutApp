import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate!: Date;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getFullYear()-18);
  }

  onSubmit(form: NgForm){
    this.auth.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }


}
