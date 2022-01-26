import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading$ = this.ui.loadingStateChanged;

  constructor(private auth:AuthService,
    private ui: UIService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){
    this.auth.login({
      email: form.value.email,
      password: form.value.password

    });
  }

}
