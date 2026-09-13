import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-alert-dialog';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export function DialogContent({ title, description, children, onConfirm, onCancel }) {
  return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="ui-dialog-overlay" /><DialogPrimitive.Content className="ui-dialog-content">
    <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
    <DialogPrimitive.Description>{description}</DialogPrimitive.Description>
    {children}
    <div className="dialog-actions"><DialogPrimitive.Cancel className="ui-button secondary" onClick={onCancel}>Cancel</DialogPrimitive.Cancel><DialogPrimitive.Action className="ui-button danger" onClick={onConfirm}>Reset data</DialogPrimitive.Action></div>
  </DialogPrimitive.Content></DialogPrimitive.Portal>;
}
