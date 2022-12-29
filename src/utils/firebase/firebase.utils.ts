import { initializeApp } from 'firebase/app';
import {
  collection,
  writeBatch,
  doc,
  getFirestore,
  query,
  getDocs,
} from 'firebase/firestore';

import { ENV_VARIABLES } from '../../shared/constants/env.const';

const firebaseConfig = {
  apiKey: ENV_VARIABLES.FIREBASE_API_KEY,
  authDomain: ENV_VARIABLES.FIREBASE_AUTH_DOMAIN,
  projectId: ENV_VARIABLES.FIREBASE_PROJECT_ID,
  storageBucket: ENV_VARIABLES.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV_VARIABLES.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV_VARIABLES.FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

const firestoreDB = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<string> => {
  const collectionRef = collection(firestoreDB, collectionKey);
  const batch = writeBatch(firestoreDB);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  return 'Done';
};

export const getCollectionAndDocuments = async <T>(title: string): Promise<T[]> => {
  const collectionRef = collection(firestoreDB, title);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as T,
  );
};
