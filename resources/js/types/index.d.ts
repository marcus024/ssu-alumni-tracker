export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface News {
    id: number;
    title: string;
    content: string;
    image?: string;
    created_at: string;
    updated_at: string;
}

export interface JobPost {
    id: number;
    title: string;
    company: string;
    description: string;
    requirements: string;
    location: string;
    created_at: string;
    updated_at: string;
}

export interface Department {
    id: number;
    name: string;
    description: string;
    logo?: string;
    total_students: number;
    total_teachers: number;
    created_at: string;
    updated_at: string;
}

export interface Graduate {
    id: number;
    name: string;
    year: number;
    course: string;
    current_work: string;
    department_id: number;
    department?: Department;
    created_at: string;
    updated_at: string;
}

export interface GalleryImage {
    id: number;
    title: string;
    description?: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface SchoolInfo {
    id: number;
    total_teachers: number;
    total_departments: number;
    total_branches: number;
    years_established: number;
    mission: string;
    vision: string;
    logo?: string;
    created_at: string;
    updated_at: string;
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
