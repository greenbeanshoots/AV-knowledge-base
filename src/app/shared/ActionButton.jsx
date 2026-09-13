import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button.jsx';

export function ActionButton({ children, onClick, to, variant = 'primary', icon: Icon }) {
  const content = <>{Icon && <Icon size={17} aria-hidden="true" />}{children}</>;
  if (to) return <Button asChild variant={variant}><Link to={to}>{content}</Link></Button>;
  return <Button variant={variant} onClick={onClick}>{content}</Button>;
}
