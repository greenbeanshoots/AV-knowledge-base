import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib/utils.js';

export function Progress({ value, label, className = '' }) {
  return <ProgressPrimitive.Root className={cn('ui-progress', className)} value={value} max={100} aria-label={label}>
    <ProgressPrimitive.Indicator className="ui-progress-indicator" style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </ProgressPrimitive.Root>;
}
