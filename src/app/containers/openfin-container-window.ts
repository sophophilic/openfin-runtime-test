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

    async setTitle(title: string) {
        try {
            this.nativeWindow.document.title = title;
            return Promise.resolve();
        } catch(err) {
            throw new Error(err);
        }
    }

    async setContent(content: string) {
        try {
            if(this.nativeWindow.document.body) {
                this.nativeWindow.document.body.innerHTML = content;
            }
            return Promise.resolve();
        } catch(err) {
            throw new Error(err);
        }
    }
}