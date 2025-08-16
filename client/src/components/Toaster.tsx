import { useToast } from '../hooks/use-toast'
import { X } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all
            ${toast.variant === 'destructive' 
              ? 'border-destructive bg-destructive text-destructive-foreground' 
              : toast.variant === 'success'
              ? 'border-green-500 bg-green-500 text-white'
              : 'border bg-background text-foreground'
            }
          `}
        >
          <div className="grid gap-1">
            {toast.title && (
              <div className="text-sm font-semibold">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm opacity-90">{toast.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}