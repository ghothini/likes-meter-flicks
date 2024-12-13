import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './components/landing/landing.component';
import { EightyComponent } from './components/eighty/eighty.component';
import { NinetyComponent } from './components/ninety/ninety.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { IconComponent } from './components/icon/icon.component';
import { MeterComponent } from './components/meter/meter.component';
import { AdComponent } from './components/ad/ad.component';
import { AboutComponent } from './components/about/about.component';
import { DurationVerifyPipe } from './pipes/duration-verify.pipe';
import { ChoosePreferedComponent } from './components/pop-ups/choose-prefered/choose-prefered.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EightyComponent,
    NinetyComponent,
    PageNotFoundComponent,
    IconComponent,
    MeterComponent,
    AdComponent,
    AboutComponent,
    DurationVerifyPipe,
    ChoosePreferedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
