import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

export function ToastProvider({ children }) { return <ToastPrimitive.Provider swipeDirection="right">{children}<ToastPrimitive.Viewport className="ui-toast-viewport" /></ToastPrimitive.Provider>; }
export function Toast({ open, onOpenChange, message }) { return <ToastPrimitive.Root className="ui-toast" open={open} onOpenChange={onOpenChange}><ToastPrimitive.Title>{message}</ToastPrimitive.Title></ToastPrimitive.Root>; }
