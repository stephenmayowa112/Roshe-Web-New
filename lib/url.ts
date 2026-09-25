// Dynamic URL detection for both development and production

export function getBaseUrl(): string {
  // Production
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXTAUTH_URL || 'https://www.roshestudios.co.uk';
  }
  
  // Development - auto-detect or use environment variable
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // Default to port 3000, but NextAuth will work with any port as long as
  // it's configured in Google Console
  return 'http://localhost:3000';
}

export function getCallbackUrl(provider: string): string {
  return `${getBaseUrl()}/api/auth/callback/${provider}`;
}