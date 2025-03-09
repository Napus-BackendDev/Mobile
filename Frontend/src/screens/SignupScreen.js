import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useFonts } from 'expo-font';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
export default function SignupScreen() {
    const [fontsLoaded] = useFonts({
            'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
        });
    const navigation = useNavigation();
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
        <Ionicons name="arrow-back" size={30} color={"black"} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.signuptitle}>SIGN UP</Text>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/Icons/UserIcon.png')} style={styles.icon} />
          <TextInput style={styles.input} placeholder="USERNAME" value={username} onChangeText={setUsername}/>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/Icons/EmailIcons.png')} style={styles.mailicon} />
          <TextInput style={styles.input} placeholder="GMAIL" value={gmail} onChangeText={setGmail} />
        </View>

        <View style={styles.inputContainer}>
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
            <Text style={styles.orText}>
            OR SIGN UP WITH
            </Text>
            <View style={styles.line}></View>
        </View>


        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} onPress={signUpWithFacebook}>
            <Image source={require('../../assets/Icons/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={signUpWithGoogle}>
            <Image source={require('../../assets/Icons/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomText}>
          <Text> ALREADY HAVE AN ACCOUNT?</Text>
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
    fontFamily: 'JosefinSans',
  },
  pageContainer: {
    padding: 30,
    borderRadius: 15,
    width: '90%',
    fontFamily: 'JosefinSans',
  },
  backButton: {
    marginBottom: -20,
    alignSelf: 'flex-start',
    padding: 5,
  },
  signuptitle: {
    fontSize: 24,
    color:"black",
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'JosefinSans',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 40,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor:"#FFF"
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
    fontFamily: 'JosefinSans',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  signupforgot:{
    color:"#FF6961",
    fontFamily: 'JosefinSans',
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
    marginBottom: 20,
    marginLeft:10,
    marginRight:10,
    fontFamily: 'JosefinSans',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  line: {
    width: 70,
    height: 1.5,
    backgroundColor: 'black',
    position:'relative',
    marginBottom:25,
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
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'JosefinSans',
  },
  signuplinkText: {
    color: '#FF6961',
    fontWeight: 'bold',
    fontFamily: 'JosefinSans',
  },
});