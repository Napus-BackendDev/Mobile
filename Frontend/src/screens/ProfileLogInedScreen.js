// Update imports
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput,ScrollView } from 'react-native';
import { useFonts } from "expo-font";
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../firebaseConfig';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import {getCardHistory} from '../../src/utils/cardHistory';

export default function ProfileLogInedScreen({ route, navigation }) {
  const { userId } = route.params;
  const [image, setImage] = useState(null);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [cardHistory,setCardHistory]=useState([]);
  const [fontsLoaded] = useFonts({
      'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isProfilePicModalVisible, setProfilePicModalVisible] = useState(false);  // Add this line
  const [isHaveHistory, setHaveHistory] = useState(false); 
  const storage = getStorage();
  const auth = getAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching data for userId:", userId);
        const userDoc = await getDoc(doc(db, 'User', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Fetched user data:", userData);
          setname(userData.username);
          setemail(userData.email);
          
          if (userData.cardHistory) {
            setCardHistory(userData.cardHistory);
          }
          // Check if profileImg exists and is not null
          if (userData.profileImg) {
            try {
              const url = await getDownloadURL(ref(storage, userData.profileImg));
              setImage(url);
            } catch (error) {
              console.error("Error fetching profile picture:", error);
              // Reset the profile picture field if URL is invalid
              await updateDoc(doc(db, 'User', userId), {
                profileImg: null
              });
            }
          }
        }
        const history =await getCardHistory(userId);
        setCardHistory(history);
        console.log("Card history:", history); // Log the card history to check i

      } catch (error) {
        console.error("Error Fetching User Data: ", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        alert('Uploading image...');
        
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        
        // Use a consistent storage path
        const storagePath = `profile_pictures/${userId}/profile.jpg`;
        const storageRef = ref(storage, storagePath);
        
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        
        // Update Firestore with the storage path
        await updateDoc(doc(db, 'User', userId), {
          profileImg: storagePath
        });
        
        setImage(url);
        setProfilePicModalVisible(false);
        alert('Profile picture updated successfully!');
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert('Failed to update profile picture: ' + error.message);
    }
  };

  const handleUpdateUsername = async () => {
    try {
      const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
      
      if (!newUsername.trim()) {
        alert('Username cannot be empty');
        return;
      }

      if (!usernameRegex.test(newUsername)) {
        alert(
          'Invalid Username',
          'Username should be 3-20 characters long and contain only letters, numbers, and underscores.'
        );
        return;
      }

      await updateDoc(doc(db, 'User', userId), {
        username: newUsername
      });
      setname(newUsername);
      setModalVisible(false);
      setNewUsername('');
      alert('Username updated successfully!');
    } catch (error) {
      console.error("Error updating username:", error);
      alert('Failed to update username');
    }
  };

  return (
    <View style={ styles.background }>
      <View style={ styles.header }>
        {!route.params?.hideBackButton && (
            <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
              <Image
                source={require('../../assets/img/Arrow.png')}
                style={{ width: 23.03, height: 14 }}
              />
            </TouchableOpacity>
          )}
        <Text style={styles.title}>PROFILE</Text>
      </View>

      <View style={ styles.profile }>
        {/* Profile Picture */}
        <TouchableOpacity onPress={()=>setProfilePicModalVisible(true)}>
          <Image
            source={image ? { uri: image } : require('../../assets/img/Profile_icon/Profile.png')}
            style={{ width: 89, height: 86, top:-35, position: 'absolute', alignSelf: 'center', borderRadius: 50, borderWidth: 3, borderColor: 'white',zIndex: 1}}
          />
        </TouchableOpacity>

        {/* Profile Picture Update Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isProfilePicModalVisible}
          onRequestClose={() => setProfilePicModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={image ? { uri: image } : require('../../assets/img/Profile_icon/Profile.png')}
                style={{ 
                  width: 100, 
                  height: 100, 
                  marginBottom: 50,
                  borderRadius: 50, 
                  borderWidth: 3, 
                  borderColor: '#FF676F'
                }}
              />
              <Text style={styles.modalTitle}>Update Profile Picture</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={() => setProfilePicModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.updateButton]} 
                  onPress={handleUpdateProfilePicture}
                >
                  <Text style={[styles.buttonText, { color: 'white' }]}>Choose Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Profile Name */}
        <View style={{ alignItems: 'center', flexDirection: 'row', top: '5.5%' }}>
          <Text style={{fontSize: 14, color: "#FF676F", fontWeight: 600}}>{name || 'Loading...'}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={require('../../assets/img/Profile_icon/Edit.png')}
            style={{ width: 12, height: 12, marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

        {/* Username Update Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new username"
                value={newUsername}
                onChangeText={setNewUsername}
                autoFocus={true}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={() => {
                    setModalVisible(false);
                    setNewUsername('');
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.updateButton]} 
                  onPress={handleUpdateUsername}
                >
                  <Text style={[styles.buttonText, { color: 'white' }]}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Profile Email */}
        <View style={{ alignItems: 'center', flexDirection: 'row', top: '7%' }}>
          <Text style={{fontSize: 12, color: "black", fontWeight: 400}}>{email || 'Loading...'}</Text>
          
        </View>

        {/* Profile History */}
        <View style={ styles.history }>
          {/* History Header */}
          <View style={{ flexDirection: 'row', marginTop: 15, width: 300 , justifyContent: 'space-between' }}>
            <Text style={{fontSize: 10 , color: "#FF676F" , fontWeight: 700}}>TAROT HISTORY</Text>
            <TouchableOpacity onPress={()=>setHaveHistory(true)}>
              <Text style={{fontSize: 10 , color: "black" , fontWeight: 500}}>SEE ALL</Text>
            </TouchableOpacity>
          </View>
          <Modal
          animationType="slide"
          transparent={true}
          visible={isHaveHistory}
          onRequestClose={() => setHaveHistory(false)}>
          
            <View style={styles.historyModalOverlay}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>TAROT HISTORY</Text>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.cardContainer}>
                    {cardHistory.length > 0 ? (
                      cardHistory.map((item, index) => (
                        <Image 
                          key={index}
                          source={{ uri: item.cardImage }} // Updated to match the correct data structure
                          style={{width: 80, height: 138}}
                        />
                      ))
                    ) : (
                      <Text>No reading history yet</Text>
                    )}
                  </View>
                </ScrollView>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => setHaveHistory(false)}>
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* History Card */}
          <View style={styles.cardContainer}>
            {cardHistory && cardHistory.length > 0 ? (
              cardHistory.slice(0, 3).map((item, index) => (
                <Image 
                  key={index}
                  source={{ uri: item.cardImage }}
                  style={{width: 80, height: 138, marginRight: 10}}
                />
              ))
            ) : (
              <Text style={{fontSize: 12, color: "black"}}>No reading history yet</Text>
            )}
          </View>
          
        </View>

        {/* Profile Buttons */}
        <View style={{alignItems: 'center', width: 230, marginTop: 15 , height: 180}}>
          <TouchableOpacity style={[styles.Button, styles.shadow]}>
            <Image source={require('../../assets/img/Profile_icon/History.png')} style={{width:16,height:16}}/>
            <Text style={styles.Button_Text}>PURCHASE HISTORY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Button, styles.shadow]}>
            <Image source={require('../../assets/img/Profile_icon/Q.png')} style={{width:10,height:16}}/>
            <Text style={{paddingLeft: 28 ,color: 'black', textAlign: 'center' , fontWeight: 500 , fontSize: 12}}>HELP & SUPPORT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Button, styles.shadow]} onPress={handleLogout}>
            <Image source={require('../../assets/img/Profile_icon/Out.png')} style={{width:16,height:14}}/>
            <Text style={styles.Button_Text}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Add these new styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    overflow: 'hidden',
    fontFamily: 'JosefinSans',
    backgroundColor: "#242049",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '8%',
  },
  title: {
    marginTop: '15%',
    marginBottom: '15%',
    marginLeft: '28%',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'JosefinSans',
  },
  text: {
    fontSize: 12,
    color: 'black',
    fontWeight: 500,
    top: '15%',
    fontFamily: 'JosefinSans',
  },
  profile: {
    alignSelf: 'center',
    width: 678,
    height: 1225,
    backgroundColor: 'white',
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    alignItems: 'center',
  },
  history: {
    marginTop: "18%",
    alignItems: 'center',
    width: 340,
    height: 200,
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    shadowColor: '#3E485A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    width: 230,
    height: 40,
    backgroundColor: '#F4F8FB',
    borderRadius: 30,
    marginTop: 30,
  },
  Button_Text: {
    paddingLeft: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 12,
    fontFamily: 'JosefinSans',
  },
  shadow: {
    shadowColor: "#3E485A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 15, 
    width: 300 , 
    height: 138, 
    justifyContent: 'flex-start'
  },
  scrollView: {
    width: '100%',
    maxHeight: '80%',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF676F',
    fontFamily: 'JosefinSans',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FF676F',
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'JosefinSans',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF676F',
    fontFamily: 'JosefinSans',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'JosefinSans',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    width: '45%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F4F8FB',
  },
  updateButton: {
    backgroundColor: '#FF676F',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'JosefinSans',
  },
});
