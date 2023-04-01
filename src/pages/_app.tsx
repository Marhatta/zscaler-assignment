import '@/styles/globals.css';
import ZSContainer from '@/components/layout/ZSContainer';
import type { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { SWRConfig } from 'swr/_internal';
import fetcher from '@/utils/swr/fetcher';
import { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }: AppProps) {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>
    <SWRConfig value={{ fetcher: fetcher }}>
      <ZSContainer>
        <Component {...pageProps} />
      </ZSContainer>
      <Toaster />
    </SWRConfig>
  </LocalizationProvider>;
}
