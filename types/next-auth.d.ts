import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      schoolId?: string;
      school?: {
        id: string;
        name: string;
        type: string;
      };
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: string;
    schoolId?: string;
    school?: {
      id: string;
      name: string;
      type: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string;
    schoolId?: string;
    school?: {
      id: string;
      name: string;
      type: string;
    };
  }
}