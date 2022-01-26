import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated!:boolean;



  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private ui:UIService) { }

  registerUser(authData:AuthData){
    this.ui.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result=>{
      this.ui.loadingStateChanged.next(false);
    })
    .catch(err=>{
      this.ui.loadingStateChanged.next(false);
      this.snackbar.open(err.message, undefined,{duration: 3000});
    })

  }

  login(authData:AuthData){
    this.ui.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(authData.email,authData.password)
    .then(result=>{
      this.ui.loadingStateChanged.next(false);
    })
    .catch(err=>{
      this.ui.loadingStateChanged.next(false);
      this.snackbar.open(err.message, undefined,{duration: 3000});
    })



  }

  logout(){
    this.afAuth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }

  initAuthListener(){
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);

      }else{
        this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
      }
    })
  }



}
