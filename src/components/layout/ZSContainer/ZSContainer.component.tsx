import React from "react";
import ZSHeader from "../ZSHeader";
import { ZSContainerProps } from './ZSContainer.types'

const ZSContainer = ({ children }: ZSContainerProps) => {
    return <>
        <ZSHeader />
        {children}
    </>
}

export default ZSContainer;