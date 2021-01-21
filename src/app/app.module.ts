import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Container, resolveContainer } from '@morgan-stanley/desktopjs';

import { AppComponent } from './app.component';
import { containerResolver } from './container-resolver/container-resolver';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
