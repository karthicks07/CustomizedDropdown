import { ReactElement } from "react";

import { CustomizedDropdownPreviewProps } from "../typings/CustomizedDropdownProps";

export function preview(props: CustomizedDropdownPreviewProps): ReactElement {
    const buttonClass = [
        "btn",
        `btn-${props.appearanceButtonType || "default"}`,
        props.appearanceButtonSize && props.appearanceButtonSize !== "default"
            ? `btn-${props.appearanceButtonSize}`
            : ""
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="customized-dropdown customized-dropdown--down customized-dropdown--left">
            <div className="customized-dropdown-trigger">
                <span className={buttonClass}>
                    <props.buttonContent.renderer caption="Button content">
                        <div style={{ minWidth: 60 }} />
                    </props.buttonContent.renderer>
                    <span className="customized-dropdown-caret" aria-hidden="true" />
                </span>
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/CustomizedDropdown.css");
}