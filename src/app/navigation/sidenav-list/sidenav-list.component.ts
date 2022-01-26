import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSub!: Subscription;

  @Output() closeSidenav = new EventEmitter<void>();
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.auth.authChange.subscribe(isAuth=>{
      this.isAuth = isAuth;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }


  onCloseSidenav(){
    this.closeSidenav.emit();

  }

  onLogout(){
    this.onCloseSidenav();
    this.auth.logout();
  }
}
