import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY || 'demo',
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID || 'demo',
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET || 'demo.appspot.com',
  appId: process.env.NEXT_PUBLIC_FB_APP_ID || 'demo',
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID || 'demo',
};

export const firebaseApp =
  getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
