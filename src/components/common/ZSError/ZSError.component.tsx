import React from 'react';
import { ZSErrorProps } from './ZSError.types';

const ZSError = ({ message = "Something went wrong" }: ZSErrorProps) => {
    return <div className='p-10'>
        <span className='text-red-500 font-semibold text-xl'>{message}</span>
    </div>
}

export default ZSError;