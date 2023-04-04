import React from 'react';
import ZSHeader from '../ZSHeader';
import { ZSContainerProps } from './ZSContainer.types'

// Container that wraps all of our pages
const ZSContainer = ({ children }: ZSContainerProps) => {
    return <>
        <ZSHeader />
        <div className="p-5">{children}</div>
    </>
}

export default ZSContainer;