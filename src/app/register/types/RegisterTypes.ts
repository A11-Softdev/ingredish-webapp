export interface RegisterFormData {
    email: string;
    password: string;
    username: string;
}

export interface RegisterResponse {
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
        image_url: string;
    };
    access_token: string;
}
