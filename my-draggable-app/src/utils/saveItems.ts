import { firestore, database } from '@/utils/firebaseConfig';
import { ref, set } from 'firebase/database';
import { doc, setDoc } from 'firebase/firestore';

// Save to Firestore
export const saveItemsToFirestore = async (items: any) => {
  try {
    const docRef = doc(firestore, 'items', 'list');  // Specify the collection and document
    await setDoc(docRef, { items });
    console.log('Data saved to Firestore');
  } catch (error) {
    console.error('Error saving to Firestore: ', error);
  }
};

// Save to Realtime Database
export const saveItemsToDatabase = async (items: any) => {
  try {
    const itemsRef = ref(database, 'items/');
    await set(itemsRef, items);  // Save all items to the "items" node
    console.log('Data saved to Realtime Database');
  } catch (error) {
    console.error('Error saving to Realtime Database: ', error);
  }
};
