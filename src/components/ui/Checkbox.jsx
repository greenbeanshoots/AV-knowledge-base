import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export const Checkbox = React.forwardRef(({ className = '', ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn('ui-checkbox', className)} {...props}>
    <CheckboxPrimitive.Indicator><Check size={15} /></CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
