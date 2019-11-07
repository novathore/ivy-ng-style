import {Component, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div [ngStyle]="styleObs$ | async">
        Some content
    </div>

    <div [ngStyle]="styleVar">
        Some content
    </div>

    <button (click)="changeStyle({background: 'cyan'})">Add style</button>
    <button (click)="changeStyle(null)">Delete style</button>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ng-ivy-bug';
  public styleObs$ = new ReplaySubject();
  public styleVar;

  ngOnInit(): void {
    this.styleObs$.next({background: 'red'});
    setTimeout(() => this.styleObs$.next(null), 1000);
  }

  changeStyle(style) {
    this.styleVar = style;
  }
}
