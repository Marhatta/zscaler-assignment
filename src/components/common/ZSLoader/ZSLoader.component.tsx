import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ZSLoaderProps } from './ZSLoader.types';

const ZSLoader = ({ show = false }: ZSLoaderProps) => {
    if (!show) return null;
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

export default ZSLoader;