import { Component, OnInit } from '@angular/core';
import { Container, ContainerEventArgs, ContainerWindow, PersistedWindow, PersistedWindowLayout } from '@morgan-stanley/desktopjs';
import { from } from 'rxjs';
import { delay, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AppResource } from './app.resource';
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
    private appResource: AppResource
    ) {

  }

  ngOnInit() {
    //TODO:
    // bringToFront on all windows
    // click to front startegy apply
    this.appResource.getDesktopLayoutJson().pipe(
      take(1),
      map((layout: PersistedWindowLayout) => {
        console.log(layout);
        return layout;
      }),
      filter(() => this.isDesktopMode()),
      switchMap((layout: PersistedWindowLayout) => {
        return from(this.container.loadLayout(layout))
          .pipe(
            delay(2000),
            tap(async(loadedLayout) => {
              for(let i = 0; i < loadedLayout.windows.length; i++) {
                const win = loadedLayout.windows[i];
                await this.setWindowState(win.name, win.state);
              }
              this.showDesktopWindows(loadedLayout.windows);
            })
          )
      })
    ).subscribe();
  }

  private isDesktopMode() {
    return /OpenFin/.test(window.navigator.userAgent);
  }

  private async showDesktopWindows(wins: PersistedWindow[]) {
      if(wins && wins.length > 0) {
        for(let i = 0; i < wins.length; i++) {
          const containerWindow: ContainerWindow | null = await this.container.getWindowByName(wins[i].name);
          if(containerWindow) {
            containerWindow.show();
          }
        }
      }
  }

  private async setWindowState(name: string, state: any) {
    const containerWindow: DesktopOpenFinContainerWindow = <DesktopOpenFinContainerWindow>(await this.container.getWindowByName(name));
    if(containerWindow) {
      containerWindow.setState(state);
      await containerWindow.setTitle(state.title);
      await containerWindow.setContent(state.body);
    }
  }
}
