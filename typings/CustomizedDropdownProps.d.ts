/**
 * This file was generated from CustomizedDropdown.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue } from "mendix";

export type AppearanceButtonSizeEnum = "lg" | "default" | "sm" | "xs";

export type AppearanceButtonTypeEnum = "default" | "primary" | "success" | "info" | "warning" | "danger" | "link";

export interface CustomizedDropdownContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    buttonContent?: ReactNode;
    generalIsDropUp: boolean;
    generalIsRightAligned: boolean;
    generalStartOpen: boolean;
    generalAutoClose: boolean;
    renderMenuContentWhenClosed: boolean;
    content?: ReactNode;
    appearanceButtonSize: AppearanceButtonSizeEnum;
    appearanceButtonType: AppearanceButtonTypeEnum;
    splitButtonSplitButtonActive: boolean;
    splitButtonSplitButtonClicked?: ActionValue;
    onOpenAction?: ActionValue;
    onCloseAction?: ActionValue;
}

export interface CustomizedDropdownPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    buttonContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    generalIsDropUp: boolean;
    generalIsRightAligned: boolean;
    generalStartOpen: boolean;
    generalAutoClose: boolean;
    renderMenuContentWhenClosed: boolean;
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    appearanceButtonSize: AppearanceButtonSizeEnum;
    appearanceButtonType: AppearanceButtonTypeEnum;
    splitButtonSplitButtonActive: boolean;
    splitButtonSplitButtonClicked: {} | null;
    onOpenAction: {} | null;
    onCloseAction: {} | null;
}
