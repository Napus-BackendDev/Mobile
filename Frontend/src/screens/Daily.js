import {
    View,
    StyleSheet,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import { useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { LinearGradient } from "expo-linear-gradient";
  import { useFonts } from "expo-font";
  
  export default function Daily() {
    const navigation = useNavigation();
  
    {
      /* Hide IOS Header */
    }
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
  
    return (
      <ScrollView>
        <LinearGradient
          colors={["#11112B", "#2D2F53", "#464A77"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.container}
        >
          {/*Header*/}
          <View>
            <ImageBackground
              source={require("../../assets/img/ResultHeader.png")}
              style={styles.image}
            >
              <View style={styles.DailyCon}>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/img/angle-left-solid 1.png")}
                    style={styles.angle}
                  ></Image>
                </TouchableOpacity>
                <Text style={styles.Daily}>DAILY</Text>
              </View>
            </ImageBackground>
          </View>
  
          {/*verse*/}
          <LinearGradient
            colors={["#100C1A", "#0E0C19"]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >
            <View style={styles.verse}>
              <Text style={styles.verseText}>
                The universe has a message for you! Pick a tarot card to reveal
                today’s guidance. Gain insight into your energy, emotions, and
                opportunities. Trust your intuition and let the cards lead the
                way.
              </Text>
            </View>
          </LinearGradient>
  
          {/*ChooseCard*/}
          <View style={styles.ChooseCardCon}></View>
          {/*RemainingCards*/}
          <LinearGradient
            colors={["#100C1A", "#0E0C19"]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >
            <View style={styles.Reamaning}>
              <Text style={styles.ReamaningText}>CHOOSE 1 CARD</Text>
            </View>
          </LinearGradient>
  
          {/*Ads*/}
          <View style={styles.Ads}>
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                fontFamily: "Josefin Sans",
                fontWeight: 700,
              }}
            >
              Ads
            </Text>
          </View>
  
          {/*ShowCard*/}
          <View style={styles.ShowCard}>
            <LinearGradient
              colors={["#473366", "#9A8EB4"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
              style={{ height: 380, marginTop: 40, borderRadius: 6 }}
            >
              <View style={styles.Card1}></View>
            </LinearGradient>
          </View>
  
          {/*Footer*/}
          <LinearGradient
            colors={["#100C1A", "#0E0C19"]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >
            <View style={styles.footer}>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#3A3F6E", "#B4BDCE"]}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 0.0, y: 1.0 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Go Back</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </LinearGradient>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: 402,
      height: 1771,
    },
  
    image: {
      width: 402,
      height: 151,
    },
  
    DailyCon: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 80,
      marginLeft: 30,
      gap: 16,
    },
  
    Daily: {
      fontFamily: "Josefin Sans",
      fontSize: 40,
      fontWeight: "bold",
      color: "#ffffff",
      textAlign: "center",
    },
  
    angle: {
      marginBottom: 10,
    },
  
    verse: {
      width: 402,
      height: 59,
    },
  
    verseText: {
      fontFamily: "Lora",
      fontSize: 10,
      textAlign: "center",
      color: "#ffffff",
      padding: 1,
      margin: 10,
    },
  
    ChooseCardCon: {
      width: 402,
      height: 604,
    },
  
    Reamaning: {
      width: 402,
      height: 139,
    },
  
    ReamaningText: {
      fontFamily: "Josefin Sans",
      fontSize: 20,
      fontWeight: 700,
      color: "#fff",
      marginLeft: 40,
      marginTop: 11
    },
  
    Ads: {
      width: 402,
      height: 74,
      backgroundColor: "#D9D9D9",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  
    ShowCard: {
      width: 402,
      height: 637,
      flexDirection: "row",
      justifyContent: "center",
    },
  
    Card1: {
      width: 220,
      height: 380,
      borderRadius: 6,
    },
  
    footer: {
      width: 402,
      height: 108,
      flexDirection: "row",
      justifyContent: "center",
    },
  
    button: {
      width: 180,
      height: 46,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 27,
    },
  
    buttonText: {
      fontFamily: "Josefin Sans",
      fontSize: 15,
      fontWeight: 700,
      color: "#fff",
    },
  });
  