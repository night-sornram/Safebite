export interface RegisterForm {
    username: string;
    password: string;
    role: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    religion: string;
    food_allergy: string;
    health_issue: string;
    age: number;
}

export const register = async (data: RegisterForm) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    if(!data.role) {
        data.role = "user";
    }

    const response = await fetch(`${url}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unexpected error occurred");
    }

    return await response.json();
};