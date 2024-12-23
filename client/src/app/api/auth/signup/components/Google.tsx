import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface GoogleRegisterComponentProps {
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}

export function GoogleRegisterComponent({ onSuccess, onError }: GoogleRegisterComponentProps) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

    return (
        <GoogleOAuthProvider clientId={clientId}>
          <div className='flex justify-center'>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() => onError(new Error('Google login failed'))}
            />
          </div>
        </GoogleOAuthProvider>
      );
}