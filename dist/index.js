import { forwardRef, useId, useRef, useEffect, useState, useMemo, cloneElement } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

// src/utils/cn.ts
function toClassName(out, value) {
  if (!value) return;
  if (typeof value === "string" || typeof value === "number") {
    out.push(String(value));
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) toClassName(out, v);
    return;
  }
  if (typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (v) out.push(k);
    }
  }
}
function cn(...values) {
  const out = [];
  for (const v of values) toClassName(out, v);
  return out.join(" ");
}

// src/utils/focus.ts
var FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "object",
  "embed",
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function isVisible(el) {
  if (el.getClientRects().length === 0) return false;
  const style = window.getComputedStyle(el);
  if (style.visibility === "hidden" || style.display === "none") return false;
  return true;
}
function getFocusableElements(container) {
  const nodes = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
  return nodes.filter((el) => isVisible(el) && !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
}
function focusSafely(el) {
  if (!el) return;
  try {
    el.focus({ preventScroll: true });
  } catch {
  }
}
var base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold leading-none transition-[transform,background-color,box-shadow,opacity] select-none [-webkit-tap-highlight-color:transparent] active:translate-y-[0.5px] disabled:opacity-60 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
var sizeClass = {
  sm: "px-3 py-2 text-sm",
  md: "px-3.5 py-2.5 text-sm",
  lg: "px-4 py-3 text-base"
};
var variantClass = {
  primary: "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] hover:scale-[1.02]",
  success: "bg-emerald-600 text-white shadow-[0_10px_18px_rgba(16,185,129,0.22)] hover:bg-emerald-700",
  warning: "bg-amber-600 text-white shadow-[0_10px_18px_rgba(245,158,11,0.22)] hover:bg-amber-700",
  danger: "bg-rose-600 text-white shadow-[0_10px_18px_rgba(244,63,94,0.22)] hover:bg-rose-700",
  secondary: "text-white bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 backdrop-blur-sm",
  ghost: "text-white/70 hover:text-white hover:bg-white/5"
};
var Button = forwardRef(function Button2({ variant = "secondary", size = "md", leftIcon, rightIcon, loading, className, disabled, children, type, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: type === "submit" ? "submit" : type === "reset" ? "reset" : "button",
      ...props,
      disabled: disabled || loading,
      className: cn(base, sizeClass[size], variantClass[variant], className),
      children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
        children
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        leftIcon ? /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: leftIcon }) : null,
        children,
        rightIcon ? /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: rightIcon }) : null
      ] })
    }
  );
});
var base2 = "inline-flex items-center justify-center rounded-xl font-semibold leading-none transition-[transform,background-color,box-shadow,opacity] select-none [-webkit-tap-highlight-color:transparent] active:translate-y-[0.5px] disabled:opacity-60 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
var sizeClass2 = {
  sm: "p-1.5 w-7 h-7",
  md: "p-2 w-9 h-9",
  lg: "p-2.5 w-11 h-11"
};
var variantClass2 = {
  primary: "bg-primary text-white shadow-glow hover:brightness-[0.98]",
  success: "bg-emerald-600 text-white shadow-[0_10px_18px_rgba(16,185,129,0.22)] hover:bg-emerald-700",
  warning: "bg-amber-600 text-white shadow-[0_10px_18px_rgba(245,158,11,0.22)] hover:bg-amber-700",
  danger: "bg-rose-600 text-white shadow-[0_10px_18px_rgba(244,63,94,0.22)] hover:bg-rose-700",
  secondary: "text-white bg-white/10 shadow-sm ring-1 ring-white/10",
  ghost: "text-white hover:bg-white/10"
};
var IconButton = forwardRef(function IconButton2({ icon, variant = "ghost", size = "md", className, disabled, type, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: type === "submit" ? "submit" : type === "reset" ? "reset" : "button",
      ...props,
      disabled,
      className: cn(base2, sizeClass2[size], variantClass2[variant], className),
      children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: icon })
    }
  );
});
var inputBase = "w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none placeholder-white/30 focus:ring-2 focus:ring-primary/40 transition-shadow";
var Input = forwardRef(function Input2({ hasError, label, error, helperText, className, id: externalId, ...props }, ref) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const showError = hasError || !!error;
  const input = /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      id: inputId,
      ...props,
      className: cn(inputBase, showError && "ring-2 ring-rose-500/40 focus:ring-rose-500/40", className)
    }
  );
  if (!label && !error && !helperText) return input;
  return /* @__PURE__ */ jsxs("div", { children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "block text-sm text-white/50 mb-1.5", children: label }),
    input,
    error && /* @__PURE__ */ jsx("p", { className: "text-rose-400 text-xs mt-1", children: error }),
    helperText && !error && /* @__PURE__ */ jsx("p", { className: "text-white/40 text-xs mt-1", children: helperText })
  ] });
});
var selectBase = "w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none focus:ring-2 focus:ring-primary/40 transition-shadow";
var Select = forwardRef(function Select2({ hasError, label, error, className, id: externalId, children, ...props }, ref) {
  const generatedId = useId();
  const selectId = externalId || generatedId;
  const showError = hasError || !!error;
  const select = /* @__PURE__ */ jsx(
    "select",
    {
      ref,
      id: selectId,
      ...props,
      className: cn(selectBase, showError && "ring-2 ring-rose-500/40 focus:ring-rose-500/40", className),
      children
    }
  );
  if (!label && !error) return select;
  return /* @__PURE__ */ jsxs("div", { children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: selectId, className: "block text-sm text-white/50 mb-1.5", children: label }),
    select,
    error && /* @__PURE__ */ jsx("p", { className: "text-rose-400 text-xs mt-1", children: error })
  ] });
});
var textareaBase = "w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white shadow-sm outline-none placeholder-white/30 focus:ring-2 focus:ring-primary/40 transition-shadow resize-y";
var Textarea = forwardRef(function Textarea2({ hasError, label, error, className, id: externalId, ...props }, ref) {
  const generatedId = useId();
  const textareaId = externalId || generatedId;
  const showError = hasError || !!error;
  const textarea = /* @__PURE__ */ jsx(
    "textarea",
    {
      ref,
      id: textareaId,
      ...props,
      className: cn(textareaBase, showError && "ring-2 ring-rose-500/40 focus:ring-rose-500/40", className)
    }
  );
  if (!label && !error) return textarea;
  return /* @__PURE__ */ jsxs("div", { children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: textareaId, className: "block text-sm text-white/50 mb-1.5", children: label }),
    textarea,
    error && /* @__PURE__ */ jsx("p", { className: "text-rose-400 text-xs mt-1", children: error })
  ] });
});
var base3 = "inline-flex items-center justify-center rounded-full font-semibold ring-1 ring-white/10";
var sizeClass3 = {
  sm: "text-xs px-2.5 py-1",
  md: "text-sm px-3 py-1.5"
};
var variantClass3 = {
  neutral: "bg-white/10 text-white/90",
  primary: "bg-primary/15 text-primary ring-primary/20",
  success: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
  successSolid: "bg-emerald-600 text-white ring-0",
  warning: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
  danger: "bg-rose-500/15 text-rose-400 ring-rose-500/20",
  dangerSolid: "bg-rose-600 text-white ring-0",
  accent: "bg-accent/15 text-accent-light ring-accent/20"
};
var Badge = forwardRef(function Badge2({ children, variant = "neutral", size = "sm", className, ...props }, ref) {
  return /* @__PURE__ */ jsx("span", { ref, ...props, className: cn(base3, sizeClass3[size], variantClass3[variant], className), children });
});
var Pill = Badge;
var trackSize = {
  sm: "w-9 h-5",
  md: "w-11 h-6"
};
var thumbSize = {
  sm: { base: "w-4 h-4", translate: "translate-x-4" },
  md: { base: "w-5 h-5", translate: "translate-x-5" }
};
function Toggle({ checked, onChange, disabled, label, size = "md", "aria-label": ariaLabel }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-label": ariaLabel || label,
        disabled,
        onClick: () => onChange(!checked),
        className: cn(
          "relative rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          trackSize[size],
          checked ? "bg-primary" : "bg-surface-300",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        ),
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "absolute top-0.5 left-0.5 rounded-full bg-white transition-transform duration-200",
              thumbSize[size].base,
              checked ? thumbSize[size].translate : "translate-x-0"
            )
          }
        )
      }
    ),
    label && /* @__PURE__ */ jsx("span", { className: "text-sm text-white/60", children: label })
  ] });
}
var sizeClass4 = {
  sm: "h-3 w-3 border",
  md: "h-4 w-4 border-2",
  lg: "h-6 w-6 border-2"
};
function Spinner({ className, size = "md" }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("inline-block rounded-full border-white/15 border-t-primary animate-spin", sizeClass4[size], className),
      "aria-hidden": "true"
    }
  );
}
function Skeleton({ className, circle }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": "true",
      className: cn("bg-white/10 animate-pulse", circle ? "rounded-full" : "rounded-lg", className)
    }
  );
}
function Card({ hoverable, variant = "surface", className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: cn(variant === "glass" ? "glass" : "surface", hoverable && "surface-hover", className)
    }
  );
}
function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel,
  ariaLabelledBy,
  closeOnBackdrop = true,
  closeOnEsc = true,
  useGlass = true,
  overlayClassName,
  contentClassName,
  zIndexClassName = "z-50"
}) {
  const dialogRef = useRef(null);
  const lastActiveElementRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    lastActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const raf = window.requestAnimationFrame(() => {
      const dialogEl = dialogRef.current;
      if (!dialogEl) return;
      const focusables = getFocusableElements(dialogEl);
      focusSafely(focusables[0] ?? dialogEl);
    });
    return () => {
      window.cancelAnimationFrame(raf);
      const lastActive = lastActiveElementRef.current;
      lastActiveElementRef.current = null;
      if (lastActive?.isConnected) focusSafely(lastActive);
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "fixed inset-0 flex items-end sm:items-center justify-center p-4 pb-safe bg-black/25 backdrop-blur-sm animate-modal-backdrop",
        zIndexClassName,
        overlayClassName
      ),
      role: "presentation",
      onMouseDown: (e) => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) onClose();
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": ariaLabelledBy ? void 0 : ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          tabIndex: -1,
          ref: dialogRef,
          className: cn(
            "w-full rounded-t-3xl sm:rounded-2xl shadow-xl ring-1 ring-white/10 animate-modal-pop focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            useGlass && "glass bg-[#0f0f18]/80",
            contentClassName
          ),
          onMouseDown: (e) => e.stopPropagation(),
          onKeyDownCapture: (e) => {
            if (closeOnEsc && e.key === "Escape") {
              e.preventDefault();
              e.stopPropagation();
              onClose();
              return;
            }
            if (e.key !== "Tab") return;
            const dialogEl = dialogRef.current;
            if (!dialogEl) return;
            const focusables = getFocusableElements(dialogEl);
            if (focusables.length === 0) {
              e.preventDefault();
              focusSafely(dialogEl);
              return;
            }
            const active = document.activeElement;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (!(active instanceof HTMLElement) || !dialogEl.contains(active)) {
              e.preventDefault();
              focusSafely(first);
              return;
            }
            if (e.shiftKey) {
              if (active === first) {
                e.preventDefault();
                focusSafely(last);
              }
            } else {
              if (active === last) {
                e.preventDefault();
                focusSafely(first);
              }
            }
          },
          children
        }
      )
    }
  );
}
var confirmVariantClass = {
  danger: "bg-rose-600 hover:bg-rose-700",
  warning: "bg-amber-600 hover:bg-amber-700",
  primary: ""
};
function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loadingText = "Processing...",
  variant = "danger",
  isLoading = false
}) {
  const titleId = useId();
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      isOpen,
      onClose,
      ariaLabelledBy: titleId,
      closeOnEsc: !isLoading,
      closeOnBackdrop: !isLoading,
      contentClassName: "max-w-md p-4 sm:p-6",
      children: [
        /* @__PURE__ */ jsx("h2", { id: titleId, className: "text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4", children: title }),
        /* @__PURE__ */ jsx("div", { className: "text-white/70 mb-4 sm:mb-6", children: message }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse sm:flex-row gap-3 sm:justify-end", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: onClose,
              disabled: isLoading,
              className: "w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-white/10 hover:bg-white/15 text-white/90 transition-colors",
              children: cancelText
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: variant === "primary" ? "primary" : "ghost",
              onClick: onConfirm,
              disabled: isLoading,
              className: cn(
                "w-full sm:w-auto px-4 py-3 sm:py-2.5 text-white transition-colors",
                variant !== "primary" && confirmVariantClass[variant]
              ),
              children: isLoading ? loadingText : confirmText
            }
          )
        ] })
      ]
    }
  );
}
function Tooltip({ content, delayMs = 500, placement = "top", className, children }) {
  const tooltipId = useId();
  const openTimerRef = useRef(null);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const contentStr = useMemo(() => {
    if (typeof content === "string") return content.trim();
    return "";
  }, [content]);
  function clearTimer() {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }
  function updatePosition() {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const centerX = r.left + r.width / 2;
    const preferTop = placement === "top";
    const topY = r.top - 10;
    const bottomY = r.bottom + 10;
    const canTop = topY > 8;
    const effPlacement = preferTop ? canTop ? "top" : "bottom" : "bottom";
    setPos({
      left: Math.round(centerX),
      top: Math.round(effPlacement === "top" ? topY : bottomY),
      placement: effPlacement
    });
  }
  function scheduleOpen() {
    clearTimer();
    openTimerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, Math.max(0, delayMs));
  }
  function close() {
    clearTimer();
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  useEffect(() => {
    return () => clearTimer();
  }, []);
  const child = cloneElement(children, {
    ref: (node) => {
      anchorRef.current = node;
      const prevRef = children.ref;
      if (typeof prevRef === "function") prevRef(node);
      else if (prevRef && typeof prevRef === "object") prevRef.current = node;
    },
    onMouseEnter: (e) => {
      children.props.onMouseEnter?.(e);
      scheduleOpen();
    },
    onMouseLeave: (e) => {
      children.props.onMouseLeave?.(e);
      close();
    },
    onFocus: (e) => {
      children.props.onFocus?.(e);
      scheduleOpen();
    },
    onBlur: (e) => {
      children.props.onBlur?.(e);
      close();
    },
    ...contentStr ? { "aria-describedby": tooltipId } : {}
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    child,
    open && content ? createPortal(
      /* @__PURE__ */ jsx(
        "div",
        {
          id: tooltipId,
          role: "tooltip",
          className: cn(
            "fixed z-[9999] max-w-[320px] rounded-lg bg-gray-900 px-3 py-2 text-xs leading-snug text-white shadow-xl pointer-events-none",
            className
          ),
          style: pos ? {
            left: pos.left,
            top: pos.top,
            transform: pos.placement === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0%)"
          } : { left: 0, top: 0, transform: "translate(-9999px, -9999px)" },
          children: content
        }
      ),
      document.body
    ) : null
  ] });
}
function EmptyState({ icon: Icon, title, description, actionLabel, onAction, children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col items-center justify-center py-12 px-4 text-center", className), children: [
    Icon ? /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-full bg-white/10 p-4", children: /* @__PURE__ */ jsx(Icon, { className: "h-8 w-8 text-white/50" }) }) : null,
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-2", children: title }),
    description ? /* @__PURE__ */ jsx("p", { className: "text-white/60 max-w-md mb-6", children: description }) : null,
    actionLabel && onAction ? /* @__PURE__ */ jsx(Button, { type: "button", variant: "primary", onClick: onAction, children: actionLabel }) : null,
    children
  ] });
}
function CollapsibleSection({ title, defaultOpen = true, children, right, className }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return /* @__PURE__ */ jsxs("div", { className: cn("rounded-xl ring-1 ring-white/10 bg-white/5 overflow-hidden", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen((prev) => !prev),
        className: "flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/[0.03] transition-colors",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: cn("h-4 w-4 text-white/40 transition-transform duration-200", isOpen && "rotate-90"),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-white", children: title })
          ] }),
          right
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        ),
        children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "px-4 pb-3", children }) })
      }
    )
  ] });
}
var maxWidthClass = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[92rem]",
  full: "max-w-full"
};
function defaultBackground() {
  return /* @__PURE__ */ jsxs("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[140px]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-20 -right-32 h-[500px] w-[500px] rounded-full bg-purple-500/[0.12] blur-[120px]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/[0.10] blur-[120px]" })
  ] });
}
function PageShell({
  header,
  background,
  variant = "plain",
  className,
  mainClassName,
  containerClassName,
  maxWidth = "xl",
  children
}) {
  const showDefaultBackground = variant !== "minimal" && !background;
  return /* @__PURE__ */ jsxs("div", { className: cn("relative overflow-hidden flex-1 min-h-full flex flex-col", className), children: [
    background,
    showDefaultBackground ? defaultBackground() : null,
    header,
    /* @__PURE__ */ jsx(
      "main",
      {
        className: cn(
          "relative py-8 flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8",
          maxWidthClass[maxWidth],
          containerClassName,
          mainClassName
        ),
        children
      }
    )
  ] });
}
function Navbar({ logo, children, className, glass = true }) {
  return /* @__PURE__ */ jsx("header", { className: cn("fixed top-0 w-full z-50", glass && "glass", className), children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: logo || /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl animated-gradient" }),
      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold tracking-tight", children: "MemeLab" })
    ] }) }),
    children && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children })
  ] }) });
}
function Sidebar({ children, collapsed = false, onToggle, className }) {
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      className: cn(
        "glass h-full flex flex-col transition-[width] duration-200 overflow-hidden",
        collapsed ? "w-16" : "w-64",
        className
      ),
      children: [
        onToggle && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "flex items-center justify-center w-full h-12 text-white/40 hover:text-white hover:bg-white/5 transition-colors",
            "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: cn("h-5 w-5 transition-transform duration-200", collapsed && "rotate-180"),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11 19l-7-7 7-7m8 14l-7-7 7-7" })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto py-2", children })
      ]
    }
  );
}
function DashboardLayout({ children, navbar, sidebar, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("min-h-screen bg-surface relative overflow-hidden", className), children: [
    /* @__PURE__ */ jsxs("div", { "aria-hidden": "true", className: "pointer-events-none fixed inset-0", children: [
      /* @__PURE__ */ jsx("div", { className: "orb orb-purple w-[400px] h-[400px] -top-[150px] -left-[150px] opacity-15" }),
      /* @__PURE__ */ jsx("div", { className: "orb orb-blue w-[300px] h-[300px] top-[60%] -right-[100px] opacity-10" })
    ] }),
    navbar,
    /* @__PURE__ */ jsxs("div", { className: cn("flex", navbar && "pt-16"), children: [
      sidebar,
      /* @__PURE__ */ jsx("main", { className: "flex-1 min-w-0 py-8 px-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children }) })
    ] })
  ] });
}

export { Badge, Button, Card, CollapsibleSection, ConfirmDialog, DashboardLayout, EmptyState, IconButton, Input, Modal, Navbar, PageShell, Pill, Select, Sidebar, Skeleton, Spinner, Textarea, Toggle, Tooltip, cn, focusSafely, getFocusableElements };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map