import { Component, OnInit } from '@angular/core';
import { Container, ContainerEventArgs, ContainerWindow, PersistedWindow, PersistedWindowLayout } from '@morgan-stanley/desktopjs';
import { map, take, tap } from 'rxjs/operators';
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
    console.log(this.container);
    this.container.addListener('layout-loaded', (event: ContainerEventArgs)  => {
      setTimeout(() => {
        this.showDesktopWindows((event as any).layout.windows);
      }, 2000);
    });
    //TODO:
    // bringToFront on all windows
    // click to front startegy apply
    this.appResource.getDesktopLayoutJson().pipe(
      take(1),
      map((layout: PersistedWindowLayout) => {
        console.log(layout);
        return layout;
      }),
      tap((layout: PersistedWindowLayout) => {
        if(this.isDesktopMode()) {
          this.container.loadLayout(layout);
        }
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
}
