import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GroundOneComponent } from './components/partials/ground-one/ground-one.component';
import { RadioGroupComponent } from './components/partials/radio-group/radio-group.component';
import { SettingsPanelComponent } from './components/partials/settings-panel/settings-panel.component';
import { JewelComponent } from './components/partials/jewel/jewel.component';
import { JewelsListComponent } from './components/partials/jewels-list/jewels-list.component';
import { JewelSummaryComponent } from './components/partials/jewel-summary/jewel-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GroundOneComponent,
    RadioGroupComponent,
    SettingsPanelComponent,
    JewelComponent,
    JewelsListComponent,
    JewelSummaryComponent,
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
