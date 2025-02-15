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

    // Set up Firebase persistence
    setPersistence(auth, indexedDBLocalPersistence)
      .then(() => console.log("Firebase Auth persistence enabled"))
      .catch((error) => console.warn("Persistence error:", error));

    // Function to send response back to parent
    function sendResponse(result: any) {
      if (window.parent && PARENT_FRAME) {
        window.parent.postMessage(JSON.stringify(result), PARENT_FRAME);
      }
    }

  // Listen for messages from the parent frame
// Listen for messages from the parent frame
const messageHandler = async (event: MessageEvent) => {
  const MAX_RETRIES = 3;

  const attemptSignIn = async () => {
    let attempt = 0;
    while (attempt < MAX_RETRIES) {
      try {
        return await signInWithPopup(auth, provider);
      } catch (error) {
        attempt++;
        if (attempt >= MAX_RETRIES) {
          throw error; // Rethrow after max retries
        }
      }
    }
  };

  if (event.data.initAuth) {
    try {
      const result = await attemptSignIn();
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