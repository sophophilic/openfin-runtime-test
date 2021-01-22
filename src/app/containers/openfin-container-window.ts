import { OpenFinContainerWindow } from "@morgan-stanley/desktopjs-openfin";

export class DesktopOpenFinContainerWindow extends OpenFinContainerWindow {
    constructor(wrap: any) {
        super(wrap);
    }

    async setAsForeground() {
        return new Promise((resolve, reject) => {
            this.innerWindow.setAsForeground(resolve, reject);
        })
    }
}