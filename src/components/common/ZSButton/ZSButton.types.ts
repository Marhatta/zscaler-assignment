import { ReactElement } from 'react';

type Variant = 'contained' | 'outlined' | 'text';
type Children = string | ReactElement;

export interface ZSButtonProps {
  variant?: Variant;
  children: Children;
  onClick?: () => void;
}
