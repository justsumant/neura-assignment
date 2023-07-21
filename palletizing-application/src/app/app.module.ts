import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeInputsComponent } from './components/partials/range-inputs/range-inputs.component';
import { PalletTypeComponent } from './components/partials/pallet-type/pallet-type.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ToggleButtonComponent } from './components/partials/toggle-button/toggle-button.component';
import { ObjectSettingsComponent } from './components/partials/object-settings/object-settings.component';
import { ObjectItemCardComponent } from './components/partials/object-item-card/object-item-card.component';
import { AddObjectButtonGroupComponent } from './components/partials/add-object-button-group/add-object-button-group.component';
import { PalletAreaComponent } from './components/partials/pallet-area/pallet-area.component';

@NgModule({
  declarations: [
    AppComponent,
    RangeInputsComponent,
    PalletTypeComponent,
    MainPageComponent,
    ToggleButtonComponent,
    ObjectSettingsComponent,
    ObjectItemCardComponent,
    AddObjectButtonGroupComponent,
    PalletAreaComponent,
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
