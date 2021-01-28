import { Injectable } from "@angular/core";
import { Container, ContainerWindow, PersistedWindow } from "@morgan-stanley/desktopjs";
import { from, fromEvent } from "rxjs";
import { mapTo, mergeMap } from "rxjs/operators";
import { DesktopOpenFinContainerWindow } from "./containers/openfin-container-window";

@Injectable()
export class AppService {
    constructor(private container: Container) {}

    isDesktopMode() {
        return /OpenFin/.test(window.navigator.userAgent);
    }

    async setWindowState(name: string, state: any) {
        const containerWindow: DesktopOpenFinContainerWindow = <DesktopOpenFinContainerWindow>(await this.container.getWindowByName(name));
        if(containerWindow) {
          await containerWindow.setState(state);
          await containerWindow.setTitle(state.title);
          await containerWindow.setContent(state.body);
        }
    }

    async showDesktopWindows(wins: PersistedWindow[]) {
        if(wins && wins.length > 0) {
          for(let i = 0; i < wins.length; i++) {
            const containerWindow: DesktopOpenFinContainerWindow | null = <DesktopOpenFinContainerWindow>(await this.container.getWindowByName(wins[i].name));
            if(containerWindow) {
              await containerWindow.show();
              await containerWindow.setAsForeground();
              this.attachEventsToBringWindowsToTop(containerWindow);
            }
          }
        }
    }

    private attachEventsToBringWindowsToTop(containerWindow: DesktopOpenFinContainerWindow) {
        from(['mousedown', 'focus'])
            .pipe(
                mergeMap((event: any) => {
                    console.log(`Event ${event} captured for window with id - ${containerWindow.id}`);
                    return fromEvent(containerWindow.nativeWindow, event, { capture: true })
                }),
                mapTo(containerWindow)
            ).subscribe((containerWindow: DesktopOpenFinContainerWindow) => {
                console.log(`Bringing window with id - ${containerWindow.id} to front`);
                containerWindow.setAsForeground();
            });
    }
}