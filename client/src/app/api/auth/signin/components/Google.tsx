"use client";

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export function GoogleLoginComponent() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
    const router = useRouter();

    const onSuccess = async (response: any) => {
        const credential: any = jwtDecode(response.credential);
        const user = {
            username: credential.email,
            password: credential.sub,
        }

        const res = await signIn("credentials", {
            username: user.username,
            password: user.password,
            redirect: false,
            callbackUrl: "/",
        });
    
        if (res?.error) {
            toast.error("Invalid username or password");
        } else {
            toast.success("Login successfully");
            router.push("/");
        }
    };

    const onError = () => {
        console.error("Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className='flex justify-center'>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onError}
                />
            </div>
        </GoogleOAuthProvider>
    );
}