import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, HTMLAttributes, ReactElement } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type ClassValue = string | number | null | undefined | boolean | Record<string, boolean | null | undefined> | ClassValue[];
/**
 * Tailwind/CSS-module friendly className composer.
 * Similar to `clsx`, but tiny and dependency-free.
 */
declare function cn(...values: ClassValue[]): string;

declare function getFocusableElements(container: HTMLElement): HTMLElement[];
declare function focusSafely(el: HTMLElement | null | undefined): void;

type Size = 'sm' | 'md' | 'lg';

type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    loading?: boolean;
};
declare const Button: react.ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    loading?: boolean;
} & react.RefAttributes<HTMLButtonElement>>;

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> & {
    icon: ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    'aria-label': string;
};
declare const IconButton: react.ForwardRefExoticComponent<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children"> & {
    icon: ReactNode;
    variant?: "primary" | "success" | "warning" | "danger" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    'aria-label': string;
} & react.RefAttributes<HTMLButtonElement>>;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
    label?: string;
    error?: string;
    helperText?: string;
};
declare const Input: react.ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
    label?: string;
    error?: string;
    helperText?: string;
} & react.RefAttributes<HTMLInputElement>>;

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    hasError?: boolean;
    label?: string;
    error?: string;
};
declare const Select: react.ForwardRefExoticComponent<SelectHTMLAttributes<HTMLSelectElement> & {
    hasError?: boolean;
    label?: string;
    error?: string;
} & react.RefAttributes<HTMLSelectElement>>;

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hasError?: boolean;
    label?: string;
    error?: string;
};
declare const Textarea: react.ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hasError?: boolean;
    label?: string;
    error?: string;
} & react.RefAttributes<HTMLTextAreaElement>>;

type BadgeVariant = 'neutral' | 'primary' | 'success' | 'successSolid' | 'warning' | 'danger' | 'dangerSolid' | 'accent';
type BadgeSize = 'sm' | 'md';
type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
};
declare const Badge: react.ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
} & react.RefAttributes<HTMLSpanElement>>;
/** Backward-compatible alias */
declare const Pill: react.ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
} & react.RefAttributes<HTMLSpanElement>>;

type ToggleSize = 'sm' | 'md';
type ToggleProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    size?: ToggleSize;
    'aria-label'?: string;
};
declare function Toggle({ checked, onChange, disabled, label, size, 'aria-label': ariaLabel }: ToggleProps): react_jsx_runtime.JSX.Element;

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerProps = {
    className?: string;
    size?: SpinnerSize;
};
declare function Spinner({ className, size }: SpinnerProps): react_jsx_runtime.JSX.Element;

type SkeletonProps = {
    className?: string;
    circle?: boolean;
};
declare function Skeleton({ className, circle }: SkeletonProps): react_jsx_runtime.JSX.Element;

type CardVariant = 'surface' | 'glass';
type CardProps = HTMLAttributes<HTMLDivElement> & {
    hoverable?: boolean;
    variant?: CardVariant;
    children: ReactNode;
};
declare function Card({ hoverable, variant, className, ...props }: CardProps): react_jsx_runtime.JSX.Element;

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    closeOnBackdrop?: boolean;
    closeOnEsc?: boolean;
    useGlass?: boolean;
    overlayClassName?: string;
    contentClassName?: string;
    zIndexClassName?: string;
};
declare function Modal({ isOpen, onClose, children, ariaLabel, ariaLabelledBy, closeOnBackdrop, closeOnEsc, useGlass, overlayClassName, contentClassName, zIndexClassName, }: ModalProps): react_jsx_runtime.JSX.Element | null;

type ConfirmDialogVariant = 'danger' | 'warning' | 'primary';
type ConfirmDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    loadingText?: string;
    variant?: ConfirmDialogVariant;
    isLoading?: boolean;
};
declare function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, loadingText, variant, isLoading, }: ConfirmDialogProps): react_jsx_runtime.JSX.Element;

type TooltipPlacement = 'top' | 'bottom';
type TooltipProps = {
    content: ReactNode;
    delayMs?: number;
    placement?: TooltipPlacement;
    className?: string;
    children: ReactElement;
};
declare function Tooltip({ content, delayMs, placement, className, children }: TooltipProps): react_jsx_runtime.JSX.Element;

type EmptyStateProps = {
    icon?: (props: {
        className?: string;
    }) => JSX.Element;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    children?: ReactNode;
    className?: string;
};
declare function EmptyState({ icon: Icon, title, description, actionLabel, onAction, children, className }: EmptyStateProps): react_jsx_runtime.JSX.Element;

type CollapsibleSectionProps = {
    title: string;
    defaultOpen?: boolean;
    children: ReactNode;
    right?: ReactNode;
    className?: string;
};
declare function CollapsibleSection({ title, defaultOpen, children, right, className }: CollapsibleSectionProps): react_jsx_runtime.JSX.Element;

type PageShellVariant = 'plain' | 'glass' | 'minimal';
type PageShellProps = {
    header?: ReactNode;
    background?: ReactNode;
    variant?: PageShellVariant;
    children: ReactNode;
    className?: string;
    mainClassName?: string;
    containerClassName?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
};
declare function PageShell({ header, background, variant, className, mainClassName, containerClassName, maxWidth, children, }: PageShellProps): react_jsx_runtime.JSX.Element;

type NavbarProps = {
    logo?: ReactNode;
    children?: ReactNode;
    className?: string;
    glass?: boolean;
};
declare function Navbar({ logo, children, className, glass }: NavbarProps): react_jsx_runtime.JSX.Element;

type SidebarProps = {
    children: ReactNode;
    collapsed?: boolean;
    onToggle?: () => void;
    className?: string;
};
declare function Sidebar({ children, collapsed, onToggle, className }: SidebarProps): react_jsx_runtime.JSX.Element;

type DashboardLayoutProps = {
    children: ReactNode;
    navbar?: ReactNode;
    sidebar?: ReactNode;
    className?: string;
};
declare function DashboardLayout({ children, navbar, sidebar, className }: DashboardLayoutProps): react_jsx_runtime.JSX.Element;

export { Badge, type BadgeProps, type BadgeSize, type BadgeVariant, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Card, type CardProps, type CardVariant, CollapsibleSection, type CollapsibleSectionProps, ConfirmDialog, type ConfirmDialogProps, type ConfirmDialogVariant, DashboardLayout, type DashboardLayoutProps, EmptyState, type EmptyStateProps, IconButton, type IconButtonProps, Input, type InputProps, Modal, type ModalProps, Navbar, type NavbarProps, PageShell, type PageShellProps, type PageShellVariant, Pill, Select, type SelectProps, Sidebar, type SidebarProps, type Size, Skeleton, type SkeletonProps, Spinner, type SpinnerProps, type SpinnerSize, Textarea, type TextareaProps, Toggle, type ToggleProps, type ToggleSize, Tooltip, type TooltipProps, cn, focusSafely, getFocusableElements };
