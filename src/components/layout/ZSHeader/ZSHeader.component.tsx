import Image from 'next/image';
import React from 'react';


const ZSHeader = () => {
    return <div className='p-3 flex justify-between shadow-md'>
        <Image src='images/logo.svg' width={100} height={60} alt='zscaler_logo' />
        <div>links here</div>
    </div>
}

export default ZSHeader