'use client';
import MenuContextProvider from '@/context/MenuContextProvider';
import { ImageKitProvider } from '@imagekit/next';

const authenticator = async () => {
    try {
      const response = await fetch('/api/imagekit-auth');
      if (!response.ok) {
        throw new Error(`Auth request failed: ${response.statusText}`);
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.error(error)
      throw new Error(`Imagekit Authentication error: ${error}`);
    }
  };

export default function Providers({children}) {
  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
        {children}
    </ImageKitProvider>
  );
}