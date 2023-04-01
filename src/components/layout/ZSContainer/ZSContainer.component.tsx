import React from "react";
import ZSHeader from "../ZSHeader";
import { ZSContainerProps } from './ZSContainer.types'

const ZSContainer = ({ children }: ZSContainerProps) => {
    return <>
        <ZSHeader />
        <div className="p-5">{children}</div>
    </>
}

export default ZSContainer;