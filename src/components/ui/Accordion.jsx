import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export const Accordion = AccordionPrimitive.Root;
export function AccordionItem({ value, children }) { return <AccordionPrimitive.Item className="ui-accordion-item" value={value}>{children}</AccordionPrimitive.Item>; }
export function AccordionTrigger({ children }) { return <AccordionPrimitive.Header className="ui-accordion-header"><AccordionPrimitive.Trigger className="ui-accordion-trigger">{children}<ChevronDown size={16} /></AccordionPrimitive.Trigger></AccordionPrimitive.Header>; }
export function AccordionContent({ children }) { return <AccordionPrimitive.Content className="ui-accordion-content">{children}</AccordionPrimitive.Content>; }
