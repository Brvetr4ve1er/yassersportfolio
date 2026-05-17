"use client";

import * as React from "react";
import type { ToastProps } from "@/components/ui/toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4000;

type State = { toasts: ToasterToast[] };

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: { type: "add"; toast: ToasterToast } | { type: "remove"; id: string }) {
  if (action.type === "add") {
    memoryState = {
      toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
    };
  } else {
    memoryState = { toasts: memoryState.toasts.filter((t) => t.id !== action.id) };
  }
  listeners.forEach((l) => l(memoryState));
}

let counter = 0;

export function toast(props: Omit<ToasterToast, "id">) {
  const id = String(++counter);
  dispatch({ type: "add", toast: { ...props, id } });
  setTimeout(() => dispatch({ type: "remove", id }), TOAST_REMOVE_DELAY);
  return id;
}

export function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const i = listeners.indexOf(setState);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);
  return { ...state, toast };
}
