import React from 'react';
import { cn } from '../../lib/utils.js';

export function Alert({ variant = 'default', className = '', children, role = 'status' }) { return <div className={cn('ui-alert', variant, className)} role={role}>{children}</div>; }
