import { View, StyleSheet, Image,Text, ImageBackground, TouchableOpacity } from "react-native";
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
        <LinearGradient
            colors={["#11112B", "#2D2F53", "#464A77"]}
            start={{ x: 0.00, y: 0.05 }}
            end={{ x: 0.95, y: 0.95 }}
            style={styles.container}
        >
            {/*Header*/}
            <View>
                <ImageBackground
                    source={require("../../assets/img/ResultHeader.png")}
                    style={styles.image}
                >
                    <TouchableOpacity>
                        <Image
                            source={require("../../assets/img/angle-left-solid 1.png")}
                            style={styles.angle}
                        ></Image>
                    </TouchableOpacity>
                    <Text style={styles.Daily}>Daily</Text>
                </ImageBackground>
            </View>

            {/*verse*/}
            <LinearGradient
                colors={["#100C1A", "#0E0C19"]}
                start={{ x: 0.00, y: 0.00 }}
                end={{ x: 0.00, y: 0.00 }}
            >
                <View style={styles.verse}>
                    <Text style={styles.verseText}>The universe has a message for you! Pick a tarot card to reveal today’s guidance. Gain insight into your energy, emotions, and opportunities. Trust your intuition and let the cards lead the way.</Text>
                </View>
            </LinearGradient>
            {/*ChooseCard*/}
            <View>

            </View>
            {/*RemainingCards */}
            <LinearGradient
                colors={["#100C1A", "#0E0C19"]}
                start={{ x: 0.00, y: 0.00 }}
                end={{ x: 0.00, y: 0.00 }}
            >
                <View style={styles.Reamaning}>

                </View>
            </LinearGradient>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        width: 402,
        height: 151,
    },

    angle: {},

    Daily: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#ffffff",
        flexDirection: "row",
    },

    verse: {
        width: 402,
        height: 59,
    },

    verseText: {
        fontFamily: "Lora",
        fontSize: 10,
        color: "#ffffff",
        width: 340,
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },

    Reamaning: {
        //width : 402,
        //height : 139,
    }
});
