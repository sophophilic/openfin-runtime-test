import { ContainerWindow, Default } from "@morgan-stanley/desktopjs";

export class WebContainer extends Default.DefaultContainer {
    constructor() {
        super(window);
    }
}