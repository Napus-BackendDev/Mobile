import { View, StyleSheet, Image, Text, ImageBackground, TouchableOpacity, ScrollView, } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { getStorage, ref, getDownloadURL } from "../../FireBaseConfig";

export default function DailyScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
    });

    const [imageUrl, setImageUrl] = useState(null);
    const [backCard, setBackCard] = useState(null);
    const [loading, setLoading] = useState(true);

    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const storage = getStorage();
                
                const imageRef = ref(storage, "Back_Card.png"); 
                const imgUrl = await getDownloadURL(imageRef);
                setImageUrl(imgUrl);

                const backRef = ref(storage, "Arcana/Justice.png");
                const backUrl = await getDownloadURL(backRef)
                setBackCard(backUrl);
            } catch (error) {
                console.log("Error fetching image:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, []);

    const cards = Array.from({ length: 78 });

    const handleCardSelect = (cardIndex) => {
        console.log(`Card ${cardIndex + 1} selected`);
    };

    return (
        <ScrollView style={{ height: "100vh", overflowY: "scroll" }}>
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
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image
                                    source={require("../../assets/img/angle-left-solid 1.png")}
                                    style={styles.angle}
                                ></Image>
                            </TouchableOpacity>
                            <Text style={styles.Daily}>DAILY</Text>
                        </View>
                    </ImageBackground>
                </View>

                {/*Card*/}
                {/* Horizontal Scroll for Cards */}
                <View style={styles.cardWrapper}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
                        {cards.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleCardSelect(index)}
                                style={styles.cardItem}
                            >
                                <Image
                                    source={require("../../assets/img/FlipCard.png")}
                                    style={styles.Card}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

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
                        <Image source={{ uri: confirm ? backCard : imageUrl }} style={styles.Card1}/>
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
                                <Text style={styles.buttonText} onPress={() => setConfirm(true)}></Text>
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
        fontFamily: 'JosefinSans',
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

    cardWrapper: {
        width: "100%",
        height: 600, // ความสูงของ Scroll View
    },
    cardContainer: {
        flexWrap: "wrap",
        width: "1000%",
    },

    cardItem: {
        width: "3.8%",
        height: 173, // ขนาดการ์ด
        marginBottom: 20, // ระยะห่างระหว่างแถว
    },

    Card: {
        width: 100.61,
        height: 173,
        position: "absolute",
        left: 30,
        top: 30,
    },

    Daily: {
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
        fontSize: 10,
        textAlign: "center",
        color: "#ffffff",
        padding: 1,
        margin: 10,
    },

    ChooseCardCon: {
        width: 402,
        height: 20,
    },

    Reamaning: {
        width: 402,
        height: 139,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ReamaningText: {
        fontSize: 20,
        fontWeight: 700,
        color: "#fff",
    },

    Ads: {
        width: 402,
        height: 74,
        backgroundColor: "#D9D9D9",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'JosefinSans',
    },

    ShowCard: {
        width: '100%',
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
        fontFamily: "JosefinSans",
        fontSize: 15,
        fontWeight: 700,
        color: "#fff",
    },
});