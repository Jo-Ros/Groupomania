import { Component, OnInit } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth$!: Observable<boolean>

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isAuth$ = this.auth.isAuth$
  }

  onLogout() {
    this.auth.logOut();
  }

}
