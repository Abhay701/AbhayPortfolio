
// This file is now a proxy for the unified Firebase configuration
import { initializeFirebase } from '@/firebase';

const { app, db, auth } = initializeFirebase();

export { app as firebaseApp, db as firestore, auth };
