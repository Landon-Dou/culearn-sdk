import { CUResponse } from './models';
export declare function connect(login: {
    username: string;
    password: string;
}, callback: (err: string | undefined, res: CUResponse | undefined) => void): void;
export declare function retrieveData(cookie: string, callback: (err: string | undefined, res: CUResponse | undefined) => void): void;
export declare function parseCookie(cookies: string): string;
export declare function parseTerm(term: Array<string>): string;
