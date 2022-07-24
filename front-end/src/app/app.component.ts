import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';

  isAuth$!: Observable<boolean>

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isAuth$ = this.auth.isAuth$
  }
}
