import React from 'react';
import { cn } from '../../lib/utils.js';

export function Card({ className = '', children }) { return <section className={cn('ui-card', className)}>{children}</section>; }
