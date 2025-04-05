// Update these imports
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL,getStorage } from 'firebase/storage';
import { db } from '../../firebaseConfig';
const storage = getStorage();
export default function ResultScreen({route}) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
  });
  const { fortuneId, title } = route.params ;  // Add cardTitle to destructuring
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handlePress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchFortuneData = async () => {
      try {
        setLoading(true);
        // Reference to the fortune document in Firestore
        console.log("Fortune ID received:", fortuneId);
        
        // Clean and format the ID properly
        const number = fortuneId.split(' ')[1];
        const formattedId = `Card ${number}`.trim();
        console.log("Cleaned ID:", formattedId);
        
        const fortuneRef = doc(db, 'Cards', formattedId);
        console.log("Full Firestore path:", fortuneRef.path);
        const fortuneSnap = await getDoc(fortuneRef);
        
        if (fortuneSnap.exists()) {
          setResult(fortuneSnap.data());
          console.log("Fortune data:", fortuneSnap.data());
          
          // Fetch the image from Firebase Storage
          try {
            const storage = getStorage();
            
            // Extract card name from result data
            const data = fortuneSnap.data();
            console.log("Raw data keys:", Object.keys(data));
            const cardName = data['์Name'] || data['Name']; // Handle both cases
            console.log("Card name retrieved:", cardName);
            
            // Determine category based on card name
            let category = '';
            
            if (cardName.includes('Cup') || cardName.includes('Bowl')) {
              category = 'Bowl';
            } else if (cardName.includes('Sword')) {
              category = 'Sword';
            } else if (cardName.includes('Cane') || cardName.includes('Wand') || cardName.includes('Rod')) {
              category = 'Cane';
            } else if (cardName.includes('Coin') || cardName.includes('Pentacle')) {
              category = 'Coin';
            } else if (cardName.includes('EXEM')) {
              category = 'EXEM';
            } else {
              // Default to Arcana for major arcana cards
              category = 'Arcana';
            }
            
            // Extract card number from fortuneId (e.g., "Card 1" -> "1")
            const cardNumber = fortuneId.split(' ')[1];
            
            // Format image name based on category
            let imagePath = '';
            
            // Create a comprehensive mapping for all 78 cards
            const cardMap = {
              // Major Arcana (22 cards)
              'The Fool': 'Arcana/The_Fool.png',
              'The Magician': 'Arcana/The_Magician.png',
              'The High Priestess': 'Arcana/The_High_Priestess.png',
              'The Empress': 'Arcana/The_Empress.png',
              'The Emperor': 'Arcana/The_Emperor.png',
              'The Hierophant': 'Arcana/The_Hierophant.png',
              'The Lovers': 'Arcana/The_Lovers.png',
              'The Chariot': 'Arcana/The_Chariot.png',
              'Strength': 'Arcana/Strength.png',
              'The Hermit': 'Arcana/The_Hermit.png',
              'Wheel of Fortune': 'Arcana/Wheel_of_Fortune.png',
              'Justice': 'Arcana/Justice.png',
              'The Hanged Man': 'Arcana/The_Hanged_Man.png',
              'Death': 'Arcana/Death.png',
              'Temperance': 'Arcana/Temperance.png',
              'The Devil': 'Arcana/The_Devil.png',
              'The Tower': 'Arcana/The_Tower.png',
              'The Star': 'Arcana/The_Star.png',
              'The Moon': 'Arcana/The_Moon.png',
              'The Sun': 'Arcana/The_Sun.png',
              'Judgement': 'Arcana/Judgement.png',
              'The World': 'Arcana/The_World.png',
              
              // Wands/Cane (14 cards)
              'Ace of Cane': 'Cane/Ace_of_Wands.png',
              '2 of Cane': 'Cane/2_Wands.png',
              '3 of Cane': 'Cane/3_Wands.png',
              '4 of Cane': 'Cane/4_Wands.png',
              '5 of Cane': 'Cane/5_Wands.png',
              '6 of Cane': 'Cane/6_Wands.png',
              '7 of Cane': 'Cane/7_Wands.png',
              '8 of Cane': 'Cane/8_Wands.png',
              '9 of Cane': 'Cane/9_Wands.png',
              '10 of Cane': 'Cane/10_Wands.png',
              'Page of Cane': 'Cane/Page_of_Wands.png',
              'Knight of Cane': 'Cane/Knight_of_Wands.png',
              'Queen of Cane': 'Cane/Queen_of_Wands.png',
              'King of Cane': 'Cane/King_of_Wands.png',
              
              // Cups/Bowl (14 cards)
              'Ace of Bowl': 'Bowl/Ace_of_Cups.png',
              '2 of Bowl': 'Bowl/2_Cups.png',
              '3 of Bowl': 'Bowl/3_Cups.png',
              '4 of Bowl': 'Bowl/4_Cups.png',
              '5 of Bowl': 'Bowl/5_Cups.png',
              '6 of Bowl': 'Bowl/6_Cups.png',
              '7 of Bowl': 'Bowl/7_Cups.png',
              '8 of Bowl': 'Bowl/8_Cups.png',
              '9 of Bowl': 'Bowl/9_Cups.png',
              '10 of Bowl': 'Bowl/10_Cups.png',
              'Page of Bowl': 'Bowl/Page_of_Cups.png',
              'Knight of Bowl': 'Bowl/Knight_of_Cups.png',
              'Queen of Bowl': 'Bowl/Queen_of_Cups.png',
              'King of Bowl': 'Bowl/King_of_Cups.png',
              
              // Swords (14 cards)
              'Ace of Sword': 'Sword/Ace_of_Swords.png',
              '2 of Sword': 'Sword/2_Swords.png',
              '3 of Sword': 'Sword/3_Swords.png',
              '4 of Sword': 'Sword/4_Swords.png',
              '5 of Sword': 'Sword/5_Swords.png',
              '6 of Sword': 'Sword/6_Swords.png',
              '7 of Sword': 'Sword/7_Swords.png',
              '8 of Sword': 'Sword/8_Swords.png',
              '9 of Sword': 'Sword/9_Swords.png',
              '10 of Sword': 'Sword/10_Swords.png',
              'Page of Sword': 'Sword/Page_of_Swords.png',
              'Knight of Sword': 'Sword/Knight_of_Swords.png',
              'Queen of Sword': 'Sword/Queen_of_Swords.png',
              'King of Sword': 'Sword/King_of_Swords.png',
              'The_chamberlain_of_Swords':'Sword/Page_of_Swords.png',
              
              // Coins/Pentacles (14 cards)
              'Ace of Coin': 'Coin/Ace_of_Pentacles.png',
              '2 of Coin': 'Coin/2_Coins.png',
              '3 of Coin': 'Coin/3_Coins.png',
              '4 of Coin': 'Coin/4_Coins.png',
              '5 of Coin': 'Coin/5_Coins.png',
              '6 of Coin': 'Coin/6_Coins.png',
              '7 of Coin': 'Coin/7_Coins.png',
              '8 of Coin': 'Coin/8_Coins.png',
              '9 of Coin': 'Coin/9_Coins.png',
              '10 of Coin': 'Coin/10_Coins.png',
              'Page of Coin': 'Coin/Page_of_Pentacles.png',
              'Knight of Coin': 'Coin/Knight_of_Pentacles.png',
              'Queen of Coin': 'Coin/Queen_of_Pentacles.png',
              'King of Coin': 'Coin/King_of_Pentacles.png',
            };
            
            // Try to find the card in our mapping
            if (cardMap[cardName]) {
              imagePath = cardMap[cardName];
              console.log(`Found card in map: ${cardName} -> ${imagePath}`);
            } else {
              console.log(`Card not found in map: ${cardName}, using fallback logic`);
              
              // Fallback logic for cards not in the map
              if (category === 'Arcana') {
                let formattedName = cardName.replace(/\s+/g, '_');
                if (formattedName.startsWith('The_')) {
                  formattedName = formattedName.substring(4);
                }
                imagePath = `${category}/${formattedName}.png`;
              }
              // Handle court cards
              else if (cardName.includes('King') || cardName.includes('Queen') || 
                  cardName.includes('Knight') || cardName.includes('Page')) {
                
                let formattedName = cardName.replace(/\s+/g, '_');
                if (formattedName.startsWith('The_')) {
                  formattedName = formattedName.substring(4);
                }
                
                // Map to the correct suit name
                let suitPath = category;
                let suitName = category;
                
                if (category === 'Cane') {
                  suitName = 'Wands';
                } else if (category === 'Bowl') {
                  suitName = 'Cups';
                } else if (category === 'Sword') {
                  suitName = 'Swords';
                } else if (category === 'Coin') {
                  suitName = 'Pentacles';
                }
                
                imagePath = `${suitPath}/${formattedName.replace(`_of_${category}`, `_of_${suitName}`)}.png`;
              }
              // Handle numbered cards
              else {
                // Extract the number from the card name
                const match = cardName.match(/\d+/);
                if (match) {
                  const cardNum = match[0];
                  
                  // Map to the correct suit name
                  let suitName = category;
                  
                  if (category === 'Cane') {
                    suitName = 'Wands';
                  } else if (category === 'Bowl') {
                    suitName = 'Cups';
                  } else if (category === 'Sword') {
                    suitName = 'Swords';
                  } else if (category === 'Coin') {
                    suitName = 'Coins'; // Use Coins for numbered Coin cards
                  }
                  
                  imagePath = `${category}/${cardNum}_${suitName}.png`;
                } else {
                  // Fallback for any other cards
                  let formattedName = cardName.replace(/\s+/g, '_');
                  imagePath = `${category}/${formattedName}.png`;
                }
              }
            }
            
            // Try to fetch the image using the determined path
            try {
              const imageRef = ref(storage, imagePath);
              const url = await getDownloadURL(imageRef);
              setImageUrl(url);
              console.log("Image URL fetched:", url);
            } catch (error) {
              console.error("Error fetching image:", error);
              // Set a default image URL if the specific card image isn't found
              setImageUrl('https://firebasestorage.googleapis.com/v0/b/mobile-app-1840d.firebasestorage.app/o/Back_Card.png?alt=media&token=8353aa40-a9b4-4bbd-9509-b2b07721244c');
            }
          } catch (imgError) {
            console.error("Error fetching image:", imgError);
            // Set a default image URL if the specific card image isn't found
            setImageUrl('https://firebasestorage.googleapis.com/v0/b/mobile-app-1840d.firebasestorage.app/o/Back_Card.png?alt=media&token=8353aa40-a9b4-4bbd-9509-b2b07721244c');
          }
          // Continue without image - will use fallback
          
        } else {
          setError('Fortune not found');
          console.log("No fortune found with ID:", fortuneId);
        }
      } catch (err) {
        console.error("Error fetching fortune:", err);
        setError('Failed to load fortune data');
      } finally {
        setLoading(false);
      }
    };

    
    fetchFortuneData();
  }, [fortuneId]);



  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={1}>
      <Text style={styles.daily}>{title || 'Error Fetch Title'}</Text>
      <View style={styles.cardContainer}>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
            resizeMode="contain"
          />
        )}
      </View>
      <Text style={styles.cardName}>{result?.Name || 'NAME'}</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{result?.Desc_Eng || "No description available"}</Text>
      </View>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{result?.Desc_Thai || "ไม่มีคำอธิบาย"}</Text>
      </View>
      <Text style={styles.press}>PRESS ANYWHERE TO CONTINUE</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242049",
    //borderWidth : 3
  },
  
  daily: {
    color : "#ffffff",
    fontFamily : "Josefin Sans",
    fontSize : 40,
    fontWeight : 600,
    letterSpacing : 4,
    width : 233,
    height : 40,
    marginTop : 30,
    marginLeft : 84.5, 
    textAlign : "center"
  },

  cardContainer: {
    width : 244,
    height : 420,
    backgroundColor : "#D9D9D9",
    borderRadius : 8,
    marginTop : 40,
    marginLeft : 79,
  },

  cardName : {
    color : "#ffffff",
    fontFamily : "Josefin Sans",
    fontSize : 20,
    fontWeight : 600,
    width : 157,
    height : 20,
    marginTop : 29,
    marginLeft : 122, 
    textAlign : "center"
  },

  descriptionBox: {
    width: 300,
    height: 90,
    marginTop: 29,
    marginLeft: 51,
    justifyContent: "center", 
    alignItems: "center",    
  },

  description: {
    color: "#ffffff",
    fontFamily: "Josefin Sans",
    fontSize: 14,
    fontWeight: 400,
    textAlign: "center",
    textTransform: "uppercase",
  },

  press: {
    color: "#ffffff",
    fontFamily: "Josefin Sans",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 40,
    textTransform: "uppercase",
    opacity: 0.5, 
  },
});

