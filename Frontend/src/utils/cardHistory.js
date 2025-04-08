import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const saveCardHistory = async (userId, cardData) => {
  if (!userId || !cardData) {
    console.log("Missing userId or cardData");
    return;
  }
  
  try {
    const userRef = doc(db, 'User', userId);
    await updateDoc(userRef, {
      cardHistory: arrayUnion(cardData)
    });
    console.log("Card history saved successfully");
  } catch (error) {
    console.error("Error saving card history:", error);
    throw error;
  }
};

export const getCardHistory = async (userId) => {
  if (!userId) return [];
  
  try {
    const userDoc = await getDoc(doc(db, 'User', userId));
    if (userDoc.exists()) {
      return userDoc.data().cardHistory || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching card history:", error);
    return [];
  }
};