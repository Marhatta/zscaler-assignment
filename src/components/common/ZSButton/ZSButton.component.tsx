import * as React from 'react';
import Button from '@mui/material/Button';
import { ZSButtonProps } from './ZSButton.types';

const ZSButton = ({ variant = 'outlined', children = 'title', onClick }: ZSButtonProps) => {
    return (
        <Button variant={variant} onClick={onClick}>{children}</Button>
    );
}

export default ZSButton;