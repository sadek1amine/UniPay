import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/client-app/sign-in');
}
