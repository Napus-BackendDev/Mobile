import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth,db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from "firebase/firestore";
export default function LoginScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
          'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
    });
    
    const [username,setUsername]=useState('');
    const [gmail,setGmail]=useState('');
    const [password,setPassword]=useState('');
    
    // Add this function to handle password reset
    const handleForgotPassword = () => {
        if (!gmail) {
            alert('Email Required', 'Please enter your email address to reset your password');
            return;
        }
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(gmail)) {
            alert('Invalid Email', 'Please enter a valid email address');
            return;
        }
        
        sendPasswordResetEmail(auth, gmail)
            .then(() => {
                alert(
                    'Password Reset Email Sent', 
                    'Check your email for instructions to reset your password'
                );
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
                alert('Error', 'Failed to send password reset email. Please try again.');
            });
    };
    
    const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
    const passwordRegex = /^[A-Za-z0-9]{8,20}$/;
    try {

          // Check if any field is empty
        if (!username || !gmail || !password) {
          alert('Invalid Input', 'Please fill all fields');
          return;
        }

        // Validate username first
        if (!usernameRegex.test(username)) {
            alert(
                'Invalid Username',
                'Username should be 3-15 characters long and contain only letters, numbers, and underscores.'
            );
            return;
        }

        // Validate email
        if (!emailRegex.test(gmail)) {
            alert('Invalid Email', 'Please enter a valid email address');
            return;
        }

        // Validate password
        if (!passwordRegex.test(password)) {
            alert(
                'Weak Password',
                'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.'
            );
            return;
        }
        // First, sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, gmail, password);
        const user = userCredential.user;

        // Get the user document from Firestore
        const userDoc = await getDoc(doc(db, "User", user.uid));
        
        if (userDoc.exists()) {
            // Check if the entered username matches the one in database
            if (userDoc.data().username !== username) {
                alert('Invalid Username', 'Username does not match our records');
                return;
            }
            // Don't update the document if it already exists
            console.log("Login Successful!");
        } else {
            // Only create a new document if it doesn't exist
            await setDoc(doc(db, "User", user.uid), {
                email: gmail,
                username: username,
                profileImg: null,
            });
            console.log("New user document created!");
        }

        navigation.navigate("ProfileLogIned", { userId: user.uid });
    } catch (error) {
        alert("You need to Sign Up,If you don't have Account!");
        console.log(error);
    }
};

  return (
    <LinearGradient
    colors={['#EFB6C8', '#8B87CC','#EFB6C8']}
    locations={[0, 0.6, 1]}
    start={{ x: 0, y: 0.2 }}  // Top-left
    end={{ x: 1, y: 1 }}
    style={styles.container}>
      <View style={styles.pageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={"white"} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.logintitle}>LOG IN</Text>

        <View style={[styles.inputContainer, styles.shadow]}>
          <Image source={require('../../assets/Icons/UserIcon.png')} style={styles.icon} />
          <TextInput style={styles.input} placeholder="USERNAME" value={username} onChangeText={setUsername}/>
        </View>

        <View style={[styles.inputContainer, styles.shadow]}>
          <Image source={require('../../assets/Icons/EmailIcons.png')} style={styles.mailicon} />
          <TextInput style={styles.input} placeholder="GMAIL" value={gmail} onChangeText={setGmail}/>
        </View>

        <View style={[styles.inputContainer, styles.shadow]}>
          <Image source={require('../../assets/Icons/LockIcon.png')} style={styles.icon} />
          <TextInput style={styles.input} placeholder="PASSWORD" secureTextEntry={true} value={password} onChangeText={setPassword} />
        </View>

        <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
          <Text style={styles.loginforgot}>FORGOT PASSWORD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={styles.loginbuttonText}>LOG IN</Text>
        </TouchableOpacity>

        <View style={styles.row}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>
            OR LOG IN WITH    
            </Text>
            <View style={styles.line}></View>
        </View>


        <View style={styles.socialButtons}>
          <TouchableOpacity style={[styles.socialButton, styles.shadow]} onPress={()=>signInWithFacebook()}>
            <Image source={require('../../assets/Icons/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.shadow]} onPress={()=>signInWithGoogle()}>
            <Image source={require('../../assets/Icons/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          
        </View>

        <View style={styles.bottomText}>
          <Text style={{ 
            fontSize: 12, 
            fontWeight: '600', // Change from 600 to '600'
            color: '#3B444D', 
            fontFamily: 'JosefinSans'
          }}>
            DON'T HAVE AN ACCOUNT?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={[styles.loginlinkText, {
              fontWeight: '600' // Change from 600 to '600'
            }]}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'JosefinSans',

  },
  pageContainer: {
    flex:1,
    padding: 30,
    borderRadius: 15,
    width: '90%',
    marginTop:120,
  },
  backButton: {
    position: 'absolute',
    top: 15, // Adjust as needed
    left: 20, // Moves it to the left
    zIndex: 10,
  },
  logintitle: {
    fontSize: 24,
    color:"white",
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'JosefinSans',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 40,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor:"#F4F8FB",
    fontFamily: 'JosefinSans',
  },
  shadow: {
    shadowColor: "#3E485A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    width: 16,
    height: 18,
    marginRight: 10,
    marginLeft:5,
  },
  mailicon:{
    width:19,
    height:13,
    marginRight:10,
    marginLeft:5,

  },
  input: {
    flex: 1,
    padding: 10,
    color: '#737B81',
    fontFamily: 'JosefinSans',
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 30,
    fontFamily: 'JosefinSans',
  },
  loginforgot:{
    fontFamily: 'JosefinSans',
    color:"white",
    fontWeight: 'bold',
  },
  login: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginbuttonText: {
    color: '#FF6961',
    fontWeight: 'bold',
    fontFamily: 'JosefinSans',
  },
  orText: {
    textAlign: 'center',
    marginLeft:10,
    marginRight:10,
    color: '#3B444D',
    fontFamily: 'JosefinSans',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 20,
  },
  line: {
    width: 70,
    height: 1.5,
    backgroundColor: '#3B444C',
    position:'relative',
    padding: '0 10',
    borderRadius:1,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  bottomText: {
    width: 240,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  loginlinkText: {
    height: '100%',
    color: '#FFF',
    fontWeight: 600,
    fontSize: 12,
    fontFamily: 'JosefinSans',
  },
});
