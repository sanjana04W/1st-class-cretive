import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { AdminUser } from "@/types";

/** Sign in with email and password */
export async function adminSignIn(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

/** Sign out */
export async function adminSignOut(): Promise<void> {
  await signOut(auth);
}

/** Get the AdminUser record from Firestore for the signed-in uid */
export async function getAdminUser(uid: string): Promise<AdminUser | null> {
  const snap = await getDoc(doc(db, "adminUsers", uid));
  if (!snap.exists()) return null;
  return { uid: snap.id, ...snap.data() } as AdminUser;
}

/** Subscribe to auth state changes */
export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
