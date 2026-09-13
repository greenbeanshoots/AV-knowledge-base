import React from 'react';
import { cn } from '../../lib/utils.js';

export function Button({ asChild = false, className = '', variant = 'primary', children, ...props }) {
  if (asChild) return React.cloneElement(children, { className: cn('ui-button', variant, className, children.props.className), ...props });
  return <button className={cn('ui-button', variant, className)} {...props}>{children}</button>;
}
