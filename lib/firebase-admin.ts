import admin from "firebase-admin";

function ensureFirebaseAdminInitialized() {
  if (admin.apps.length) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  // Important: do not throw during `next build` when these secrets are intentionally absent.
  // Only throw at runtime when a route actually needs Firebase Admin.
  if (!projectId || !clientEmail || !privateKey) return;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export function getAdminAuth() {
  ensureFirebaseAdminInitialized();

  if (!admin.apps.length) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  return admin.auth();
}
