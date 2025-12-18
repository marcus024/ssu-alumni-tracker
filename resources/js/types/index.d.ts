export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role?: string;
    phone?: string;
    year?: number;
    course?: string;
    current_work?: string;
    department_id?: number;
    department?: Department;
    status?: 'pending' | 'approved' | 'rejected';
    created_at?: string;
    updated_at?: string;
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
    application_url?: string;
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
    email?: string;
    phone?: string;
    year: number;
    course: string;
    current_work: string;
    department_id: number;
    department?: Department;
    status?: 'pending' | 'approved' | 'rejected';
    profile_picture?: string;
    activity_images?: string[];
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
    hero_image?: string;
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

export interface Event {
    id: number;
    title: string;
    description: string;
    location?: string;
    image?: string;
    event_date: string;
    event_end_date?: string;
    is_featured: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface FundRaising {
    id: number;
    title: string;
    description: string;
    goal_amount: number;
    current_amount: number;
    image?: string;
    start_date: string;
    end_date?: string;
    account_name?: string;
    account_number?: string;
    is_active: boolean;
    progress_percentage?: number;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    user_id: number;
    user?: User;
    title: string;
    content: string;
    image?: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface ChatMessage {
    id: number;
    user_id: number;
    user?: User;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

export interface JobApplication {
    id: number;
    job_post_id: number;
    job_post?: JobPost;
    applicant_name: string;
    applicant_email: string;
    applicant_phone: string;
    cover_letter: string;
    resume_path: string;
    status: 'pending' | 'reviewing' | 'shortlisted' | 'interview' | 'offered' | 'rejected';
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface SiteSettings {
    id: number;
    logo?: string;
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
    facebook_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    linkedin_url?: string;
    youtube_url?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    siteSettings?: SiteSettings | null;
};
