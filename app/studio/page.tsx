import { redirect } from 'next/navigation';

export default function StudioPage() {
  // Redirect to sign in page by default
  // In a real app, you would check authentication status here
  redirect('/studio/signin');
}