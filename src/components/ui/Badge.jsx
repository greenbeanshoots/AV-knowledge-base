import React from 'react';
import { cn } from '../../lib/utils.js';

export function Badge({ variant = 'default', className = '', children }) {
  return <span className={cn('ui-badge', variant, className)}>{children}</span>;
}
