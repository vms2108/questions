import { IndexModule } from './route-modules/index/index.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { API_URL_GATEWAY } from './api-service.config';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: API_URL_GATEWAY,
      useValue: environment.gateway,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
