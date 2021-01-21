import { DesktopOpenFinContainerWindow } from "./openfin-container-window";
import { OpenFinContainer } from "@morgan-stanley/desktopjs-openfin";

export class DesktopOpenFinContainer extends OpenFinContainer {
    constructor(
        private desktop: any,
        private window: Window,
        private options: any
    ) {
        super(desktop, window, options);
    }

    // wrapWindow(containerWindow: any) {
    //     return new DesktopOpenFinContainerWindow(containerWindow);
    // }
}