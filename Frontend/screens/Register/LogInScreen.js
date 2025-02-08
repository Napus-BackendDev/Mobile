import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LogInScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/RegisterImage/icon.png")}
        style={{ width: 229, height: 203 }}
      />
      <TextInput style={styles.input} placeholder="Enter Your Email" />
      <TextInput style={styles.input} placeholder="Enter Your Password" />

      <TouchableOpacity
        style={styles.buttonContinue}
        onPress={() => navigation.navigate('Tab')}
      >
        <Text style={styles.buttonTextContinue}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonReset}
        onPress={() => alert("Button Clicked")}
      >
        <Text style={styles.buttonResetText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Button Clicked")}
      >
        <Image
          source={require("../../assets/RegisterImage/facebook_icon.png")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Button Clicked")}
      >
        <Image
          source={require("../../assets/RegisterImage/google_icon.png")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Button Clicked")}
      >
        <Image
          source={require("../../assets/RegisterImage/Apple_icon.png")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don’t Have an Account?{" "}
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonImage: {
    padding: 8,
    borderRadius: 50,
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    width: "98%",
    margin: 12,
    backgroundColor: "#EBEBEB",
    padding: 9,
    borderRadius: 10,
    width: "98%",
  },
  buttonContinue: {
    backgroundColor: "#F9A825",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: "98%",
    alignItems: "center",
  },
  buttonTextContinue: {
    color: "#171717",
    fontSize: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBEBEB",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: "98%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#171717",
    fontSize: 15,
  },
  buttonReset: {
    alignSelf: "flex-end",
    marginVertical: 1,
    padding: 5,
  },
  buttonResetText: {
    color: "#F9A825",
    fontSize: 13,
  },
  signUpLink: {
    color: "#F9A825",
  },
  signUpText: {
    marginTop: 15,
  },
});