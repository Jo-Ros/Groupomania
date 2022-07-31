import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable, tap } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  isAuth$!: Observable<boolean>;

  constructor(private auth: AuthService, 
              private breakpointObserver: BreakpointObserver) { }

  readonly breakpoint$ = this.breakpointObserver
    .observe([ '(max-width: 540px)', '(min-width: 541px)'])
    .pipe(
      distinctUntilChanged()
    )
  
  ngOnInit(): void {
    this.isAuth$ = this.auth.isAuth$;

    this.breakpoint$.subscribe(() => this.breakpointChanged())
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched('(min-width: 541px)')) {
      this.currentBreakpoint = '(min-width: 541px)';
    }
    else if (this.breakpointObserver.isMatched('(max-width: 540px)')) {
      this.currentBreakpoint = '(max-width: 540px)';
    }
  }
}
