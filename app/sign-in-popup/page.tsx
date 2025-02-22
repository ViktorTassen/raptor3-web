"use client";

import { useEffect } from 'react';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  setPersistence, 
  indexedDBLocalPersistence, 
  signOut
} from 'firebase/auth';
import { firebaseApp } from '../firebase';

export default function SignInPopup() {
  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    
    provider.setCustomParameters({
      prompt: "select_account"
    });

    // Get parent frame origin
    const PARENT_FRAME = document.location.ancestorOrigins?.[0];

    // Function to send response back to parent
    function sendResponse(result: any) {
        window.parent.postMessage(JSON.stringify(result), PARENT_FRAME);
    }

    // Listen for messages from the parent frame
    const messageHandler = async (event: MessageEvent) => {
      if (event.data.initAuth) {
        try {
          const result = await signInWithPopup(auth, provider);
          sendResponse(result);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "An unknown error occurred";
          sendResponse({ error: errorMessage });
        }
      } else if (event.data.initLogOut) {
        try {
          const result = await signOut(auth);
          sendResponse(result);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "An unknown error occurred";
          sendResponse({ error: errorMessage });
        }
      }
    };

    window.addEventListener('message', messageHandler);

    // Cleanup
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-900">
        Firebase Auth for Chrome Extension
      </h1>
    </div>
  );
}