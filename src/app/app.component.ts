import { Component, OnInit } from '@angular/core';
import { Container, ContainerEventArgs, ContainerWindow, PersistedWindow, PersistedWindowLayout } from '@morgan-stanley/desktopjs';
import { from } from 'rxjs';
import { delay, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AppResource } from './app.resource';
import { AppService } from './app.service';
import { DesktopOpenFinContainerWindow } from './containers/openfin-container-window';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'openfin-runtime-test';
  constructor(
    private container: Container,
    private appResource: AppResource,
    private appService: AppService
    ) {

  }

  ngOnInit() {
    //TODO:
    // bringToFront on all windows
    // click to front startegy apply
    this.appResource.getDesktopLayoutJson().pipe(
      filter(() => this.appService.isDesktopMode()),
      take(1),
      switchMap((layout: PersistedWindowLayout) => {
        return from(this.container.loadLayout(layout))
          .pipe(
            delay(2000),
            tap(async(loadedLayout) => {
              for(let i = 0; i < loadedLayout.windows.length; i++) {
                const win = loadedLayout.windows[i];
                await this.appService.setWindowState(win.name, win.state);
              }
              await this.appService.showDesktopWindows(loadedLayout.windows);
            })
          )
      })
    ).subscribe();
  }

}
