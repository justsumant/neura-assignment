import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeInputsComponent } from './components/range-inputs/range-inputs.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { PalletTypeComponent } from './components/pallet-type/pallet-type.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FinishPageComponent } from './components/finish-page/finish-page.component';

@NgModule({
  declarations: [AppComponent, RangeInputsComponent, InitialPageComponent, PalletTypeComponent, MainPageComponent, FinishPageComponent],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
