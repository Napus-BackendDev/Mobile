import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { Alert } from 'react-native';
import { useFonts } from 'expo-font';

export default function SignupScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
            'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
    });
    const [username, setUsername] = useState('');
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const signUpWithFacebook = async () => {
    };
    const signUpWithGoogle = async () => {
    };
    const handleSignup = async () => {
      const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;//username
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//correct email pattern
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;//password validation
         // Check if any field is empty
          if (!username || !gmail || !password) {
            Alert.alert('Invalid Input', 'Please fill all fields');
            return;
          }
          // Validate username first
          if (!usernameRegex.test(username)) {
              Alert.alert(
                  'Invalid Username',
                  'Username should be 3-15 characters long and contain only letters, numbers, and underscores.'
              );
              return;
          }
          // Validate email
          if (!emailRegex.test(gmail)) {
              Alert.alert('Invalid Email', 'Please enter a valid email address');
              return;
          }
          // Validate password
          if (!passwordRegex.test(password)) {
              Alert.alert(
                  'Weak Password',
                  'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.'
              );
              return;
          }


    // try {
    //   const response = await fetch('https://backend-api.com/api/user/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, gmail, password })
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     Alert.alert('Success', 'Signup successful!');
    //     console.log(data);
    //     // navigation.navigate("HomeScreen")
    //   } else {
    //     Alert.alert('Error', data.message || 'Signup failed');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   Alert.alert('Error', 'Something went wrong. Please try again.');
    // }
    };

  return (
    <LinearGradient colors={['#FFF','#FFF']} style={styles.container}>
      <View style={styles.pageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="arrow-back" size={30} color={"#3B444D"} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.signuptitle}>SIGN UP</Text>

        <View style={[styles.inputContainer, styles.shadow]}>
          <Image source={require('../../assets/Icons/UserIcon.png')} style={styles.icon} />
          <TextInput style={styles.input} placeholder="USERNAME" value={username} onChangeText={setUsername}/>
        </View>

        <View style={[styles.inputContainer, styles.shadow]}>
          <Image source={require('../../assets/Icons/EmailIcons.png')} style={styles.mailicon} />
          <TextInput style={styles.input} placeholder="GMAIL" value={gmail} onChangeText={setGmail} />
        </View>

        <View style={[styles.inputContainer, styles.shadow]}>
          <Image source={require('../../assets/Icons/LockIcon.png')} style={styles.icon} />
          <TextInput style={styles.input} placeholder="PASSWORD" secureTextEntry={true} value={password} onChangeText={setPassword} />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.signupforgot}>FORGOT PASSWORD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signup} onPress={handleSignup}>
          <Text style={styles.signupbuttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <View style={styles.row}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>OR SIGN UP WITH</Text>
            <View style={styles.line}></View>
        </View>


        <View style={styles.socialButtons}>
          <TouchableOpacity style={[styles.socialButton, styles.shadow]} onPress={signUpWithFacebook}>
            <Image source={require('../../assets/Icons/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.shadow]} onPress={signUpWithGoogle}>
            <Image source={require('../../assets/Icons/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomText}>
          <Text style={{ fontSize: 12, fontWeight: 600, color: '#3B444D', fontFamily: 'JosefinSans', }}> ALREADY HAVE AN ACCOUNT?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signuplinkText}>LOG IN</Text>
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
    top: 15,
    left: 20, 
    zIndex: 10,
  },
  signuptitle: {
    fontSize: 24,
    color:"#3B444D",
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
  signupforgot:{
    color:"#FF6961",
    fontFamily: 'JosefinSans',
    fontWeight:"bold",
  },

  signup: {
    backgroundColor: '#FF6961',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupbuttonText: {
    color: '#FFFFFF',
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
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  bottomText: {
    width: 250,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  signuplinkText: {
    height: '100%',
    color: '#FF7575',
    fontWeight: 600,
    fontSize: 12,
    fontFamily: 'JosefinSans',
  },
});