import ZSButton from '@/components/common/ZSButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

// Main Header bar of the layout
const ZSHeader = () => {
    const router = useRouter();
    return <div className='p-3 flex justify-between shadow-md'>
        <Image
            src='images/logo.svg'
            width={100}
            height={60}
            alt='zscaler_logo'
            onClick={() => router.push('/')}
        />
        {router.route !== '/' &&
            <ZSButton variant='text' onClick={() => router.back()}>Back</ZSButton>}
    </div>
}

export default ZSHeader