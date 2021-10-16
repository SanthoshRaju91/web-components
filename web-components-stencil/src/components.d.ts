/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface UcSideDrawer {
        "open": () => Promise<void>;
        "opened": boolean;
        "title": string;
    }
    interface UcTooltip {
        "message": string;
    }
}
declare global {
    interface HTMLUcSideDrawerElement extends Components.UcSideDrawer, HTMLStencilElement {
    }
    var HTMLUcSideDrawerElement: {
        prototype: HTMLUcSideDrawerElement;
        new (): HTMLUcSideDrawerElement;
    };
    interface HTMLUcTooltipElement extends Components.UcTooltip, HTMLStencilElement {
    }
    var HTMLUcTooltipElement: {
        prototype: HTMLUcTooltipElement;
        new (): HTMLUcTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "uc-side-drawer": HTMLUcSideDrawerElement;
        "uc-tooltip": HTMLUcTooltipElement;
    }
}
declare namespace LocalJSX {
    interface UcSideDrawer {
        "opened"?: boolean;
        "title"?: string;
    }
    interface UcTooltip {
        "message"?: string;
    }
    interface IntrinsicElements {
        "uc-side-drawer": UcSideDrawer;
        "uc-tooltip": UcTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "uc-side-drawer": LocalJSX.UcSideDrawer & JSXBase.HTMLAttributes<HTMLUcSideDrawerElement>;
            "uc-tooltip": LocalJSX.UcTooltip & JSXBase.HTMLAttributes<HTMLUcTooltipElement>;
        }
    }
}
