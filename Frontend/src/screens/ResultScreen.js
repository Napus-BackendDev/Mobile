import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ResultScreen() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={1}>
      <Text style={styles.daily}>DAILY</Text>
      <View style={styles.cardContainer}></View>
      <Text style={styles.cardName}>NAME</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>DESCRIPTION</Text>
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
    marginTop : 100,
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

