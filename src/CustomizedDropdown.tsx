import {
    MouseEvent as ReactMouseEvent,
    ReactElement,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState
} from "react";

import { CustomizedDropdownContainerProps } from "../typings/CustomizedDropdownProps";

import "./ui/CustomizedDropdown.css";

const INTERACTIVE_SELECTOR =
    "input, textarea, select, button, label, a, [contenteditable='true'], [role='combobox'], [role='textbox']";

export function CustomizedDropdown(props: CustomizedDropdownContainerProps): ReactElement {
    const {
        buttonContent,
        content,
        generalIsDropUp,
        generalIsRightAligned,
        generalStartOpen,
        generalAutoClose,
        renderMenuContentWhenClosed,
        appearanceButtonSize,
        appearanceButtonType,
        splitButtonSplitButtonActive,
        splitButtonSplitButtonClicked,
        onOpenAction,
        onCloseAction
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(generalStartOpen);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();

    // Keep the latest actions in refs so the effect below never uses stale values.
    const onOpenRef = useRef(onOpenAction);
    const onCloseRef = useRef(onCloseAction);
    onOpenRef.current = onOpenAction;
    onCloseRef.current = onCloseAction;

    // Run On open / On close only on real transitions, not on the first render.
    const previousOpenRef = useRef<boolean>(generalStartOpen);
    useEffect(() => {
        if (previousOpenRef.current === isOpen) {
            return;
        }
        previousOpenRef.current = isOpen;

        const action = isOpen ? onOpenRef.current : onCloseRef.current;
        if (action?.canExecute && !action.isExecuting) {
            action.execute();
        }
    }, [isOpen]);

    const toggleDropdown = useCallback((): void => {
        setIsOpen(previous => !previous);
    }, []);

    const closeDropdown = useCallback((): void => {
        setIsOpen(false);
    }, []);

    // Outside-click and Escape handling. Listeners exist only while open.
    // The handlers only observe: they never call preventDefault or stopPropagation,
    // so the clicked element keeps its normal behaviour.
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent): void => {
            const wrapper = wrapperRef.current;
            if (!wrapper) {
                return;
            }
            if (!event.composedPath().includes(wrapper)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                setIsOpen(false);
                toggleRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown, true);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, true);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleMenuClick = (event: ReactMouseEvent<HTMLDivElement>): void => {
        if (!generalAutoClose) {
            return;
        }
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }
        // Clicks on form controls, buttons and links inside the menu keep it open.
        if (target.closest(INTERACTIVE_SELECTOR)) {
            return;
        }
        closeDropdown();
    };

    const handleSplitButtonClick = (): void => {
        const action = splitButtonSplitButtonClicked;
        if (action?.canExecute && !action.isExecuting) {
            action.execute();
        }
    };

    const buttonClass = [
        "btn",
        `btn-${appearanceButtonType || "default"}`,
        appearanceButtonSize && appearanceButtonSize !== "default" ? `btn-${appearanceButtonSize}` : ""
    ]
        .filter(Boolean)
        .join(" ");

    const wrapperClass = [
        "customized-dropdown",
        generalIsDropUp ? "customized-dropdown--up" : "customized-dropdown--down",
        generalIsRightAligned ? "customized-dropdown--right" : "customized-dropdown--left",
        isOpen ? "is-open" : "",
        props.class
    ]
        .filter(Boolean)
        .join(" ");

    const shouldRenderMenu = isOpen || renderMenuContentWhenClosed;

    return (
        <div ref={wrapperRef} className={wrapperClass} style={props.style}>
            <div className="customized-dropdown-trigger">
                {splitButtonSplitButtonActive ? (
                    <>
                        <button
                            type="button"
                            className={`${buttonClass} customized-dropdown-main-button`}
                            onClick={handleSplitButtonClick}
                        >
                            {buttonContent}
                        </button>
                        <button
                            ref={toggleRef}
                            type="button"
                            className={`${buttonClass} customized-dropdown-toggle`}
                            onClick={toggleDropdown}
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                            aria-controls={menuId}
                            aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
                        >
                            <span className="customized-dropdown-caret" aria-hidden="true" />
                        </button>
                    </>
                ) : (
                    <button
                        ref={toggleRef}
                        type="button"
                        className={`${buttonClass} customized-dropdown-single-button`}
                        onClick={toggleDropdown}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-controls={menuId}
                    >
                        <span className="customized-dropdown-button-content">{buttonContent}</span>
                        <span className="customized-dropdown-caret" aria-hidden="true" />
                    </button>
                )}
            </div>

            {shouldRenderMenu && (
                <div
                    id={menuId}
                    className="customized-dropdown-menu"
                    hidden={!isOpen}
                    onClick={handleMenuClick}
                >
                    {content}
                </div>
            )}
        </div>
    );
}