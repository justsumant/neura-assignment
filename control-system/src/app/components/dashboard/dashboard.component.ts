import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { IPanelSettings, MoveActionType } from 'src/app/models/app.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  moveSubject: Subject<any> = new Subject();
  settings!: IPanelSettings;
  moveEvent(action: MoveActionType) {
    this.moveSubject.next(action);
  }

  setSettings(settings: IPanelSettings) {
    this.settings = settings;
  }
}
