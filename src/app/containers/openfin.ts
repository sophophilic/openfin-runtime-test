import { DesktopOpenFinContainerWindow } from "./openfin-container-window";
import { OpenFinContainer } from "@morgan-stanley/desktopjs-openfin";
import { ContainerWindow } from "@morgan-stanley/desktopjs";

export class DesktopOpenFinContainer extends OpenFinContainer {

    private stateMap: { [id: string]: any} = {};
    private mainWindow!: DesktopOpenFinContainerWindow;
    constructor(
        private desktop: any,
        private window: Window,
        private options: any
    ) {
        super(desktop, window, options);
    }

    wrapWindow(containerWindow: any) {
         return new DesktopOpenFinContainerWindow(containerWindow);
    }

    getMainWindow() {
        if(!this.mainWindow) {
            this.mainWindow = this.wrapWindow(window);
        }
        return this.mainWindow;
    }

    async createWindow(url: string, winOptions?: any): Promise<ContainerWindow> {
        const options = {
            ...winOptions,
            api: {
                iframe: {
                    sameOriginInjection: true,
                    crossOriginInjection: true
                }
            }
        };
        url = url || `/assets/blank.html`;
        return super.createWindow(url, options).then((containerWindow: ContainerWindow) => {
            console.log(`New window created with id - ${containerWindow.id}`);
            this.addGetSetStateMethods(containerWindow);
            return containerWindow;
        }).catch(error => {
            console.error(`Unexpected error while creating new window - ${error}`);
            return error;
        })
    }

    async getAllWindows(): Promise<DesktopOpenFinContainerWindow[]> {
        return new Promise((resolve, reject) => {
            this.desktop.Application.getCurrent().getChildWindows((wins: any) => {
                const childWins = wins.map((win: any) => this.wrapWindow(win));
                resolve(childWins);
            }, reject);
        });
    }

    async getWindowByName(name: string): Promise<ContainerWindow | null> {
        const wins = await this.getAllWindows();
        const win = wins.find(win => win.name === name);
        return win ? win : null;
    }

    private addGetSetStateMethods(containerWindow: ContainerWindow) {
        (<any>containerWindow.nativeWindow).getState = () => {
            return this.stateMap[containerWindow.id];
        }

        (<any>containerWindow.nativeWindow).setState = (state: any) => {
            this.stateMap[containerWindow.id] = state;
        }
    }
}