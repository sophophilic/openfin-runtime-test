import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Container, resolveContainer } from '@morgan-stanley/desktopjs';

import { AppComponent } from './app.component';
import { containerResolver } from './container-resolver/container-resolver';
import { AppResource } from './app.resource';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => containerResolver()
      },
      multi: true
    },
    {
      provide: Container,
      useFactory: () => resolveContainer()
    },
    AppResource,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
