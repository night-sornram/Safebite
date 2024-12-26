import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface GoogleRegisterComponentProps {
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}

export function GoogleRegisterComponent({ onSuccess, onError }: GoogleRegisterComponentProps) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

    return (
        <GoogleOAuthProvider clientId={"1034766512588-u9tmfmncl9g86pr2a4q2o5hht6hbgm7e.apps.googleusercontent.com"}>
          <div className='flex justify-center'>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() => onError(new Error('Google login failed'))}
            />
          </div>
        </GoogleOAuthProvider>
      );
}