export interface MemberPayload {
    sub: string;
    email: string;
    name: string;
    permissions: string[];
    iat?: number;
    exp?: number;
}
