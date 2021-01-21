import { DesktopOpenFinContainer } from "../containers/openfin";
import { WebContainer } from "../containers/web";
import { registerContainer } from "@morgan-stanley/desktopjs";

export const containerResolver = () => {
    const isDesktop = (<any>window).fin && (<any>window).fin.desktop !== 'undefined';

    if(isDesktop) {
        registerContainer('OpenFin', {
            condition: () => true,
            create: (options) => {
                return new DesktopOpenFinContainer((<any>window).fin.desktop, window, options);
            }

        });
    } else {
        registerContainer('OpenFin', {
            condition: () => true,
            create: (options) => {
                return new WebContainer();
            }

        });
    }
    
}