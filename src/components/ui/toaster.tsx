"use client"
import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastProps
} from "@/components/ui/toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
}

const listeners: Array<(state: {toasts: ToasterToast[]}) => void> = []
let memoryState: {toasts: ToasterToast[]} = { toasts: [] }

function dispatch(action: any) {
  if (action.type === 'ADD_TOAST') {
    memoryState = { ...memoryState, toasts: [action.toast, ...memoryState.toasts] };
  } else if (action.type === 'DISMISS_TOAST') {
     memoryState = { ...memoryState, toasts: memoryState.toasts.map(t => t.id === action.toastId ? {...t, open: false} : t) };
  } else if (action.type === 'REMOVE_TOAST') {
    memoryState = {...memoryState, toasts: memoryState.toasts.filter(t => t.id !== action.toastId)};
  }
  
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export function toast(props: Omit<ToasterToast, 'id'>) {
    const id = genId()
    const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })
    dispatch({ type: 'ADD_TOAST', toast: {...props, id, open: true, onOpenChange: (open: boolean) => !open && dismiss()} });
    setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', toastId: id})
    }, 5000);
}

export function useToast() {
  const [state, setState] = React.useState(memoryState)
  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])
  return { ...state, toast };
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
