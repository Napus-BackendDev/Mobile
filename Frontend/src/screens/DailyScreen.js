import { View, StyleSheet, Image, Text, ImageBackground, TouchableOpacity, ScrollView, } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { getStorage, ref, getDownloadURL, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function DailyScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
    });

    const [imageUrl, setImageUrl] = useState(null);
    const [backCard, setBackCard] = useState(null);

    const [tarotName, setTarotName] = useState('');
    const [tarotDesc, setTarotDesc] = useState('');

    const [chooseCard, setChooseCard] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);

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
            }
        };
        fetchImage();

        const fetchData = async () => {
            try {
                const userDoc = await getDoc(doc(db, "Cards", "Card 12"));

                if (userDoc.exists()) {
                    setTarotName(userDoc.data().Name);
                    setTarotDesc(userDoc.data().Desc_Eng);
                } else {
                    console.log("No document");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const cards = Array.from({ length: 78 }, (_, index) => ({
        id: index + 1,
        title: `The Fool ${index + 1}`,
        description: `Description for Card ${index + 1}`,
        image: <Image
            source={require("../../assets/img/TheFool.png")}
            style={styles.image}></Image>
    }));

    const handleCardSelect = (cardIndex) => {
        const selected = cards[cardIndex];
        setSelectedCard(selected);
        setChooseCard(true);
    };


    return (
        <ScrollView style={{ height: "100vh", overflowY: "scroll", }}>
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
                <View style={[styles.ShowCard, { height: confirm ? 751 : 452 }]}>
                    <Image
                        source={{ uri: chooseCard ? (confirm ? selectedCard.image : imageUrl) : '' }}
                        style={styles.Card1}
                    />
                    {confirm && selectedCard && (
                        <View style={styles.tarotInfo}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.tarotName}>{selectedCard.title}</Text>
                            </View>
                            <LinearGradient colors={['#473366', '#9A8EB4']} style={styles.descContainer}>
                                <Text style={styles.tarotDesc}>{selectedCard.description}</Text>
                            </LinearGradient>
                        </View>
                    )}
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
                                <Text
                                    style={styles.buttonText}
                                    onPress={() => {
                                        if (chooseCard) {
                                            if (confirm) {
                                                navigation.navigate('Home');
                                            } else {
                                                setConfirm(true);
                                            }
                                        }
                                    }}
                                >
                                    {confirm ? 'BACK' : 'CONFIRM'}
                                </Text>
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
        height: 1880,
        fontFamily: 'JosefinSans',
    },

    image: {
        width: 402,
        height: 150,
    },

    DailyCon: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 80,
        marginLeft: 30,
        gap: 22,
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
        marginBottom: -3,
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
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ReamaningText: {
        fontSize: 20,
        fontWeight: 700,
        color: "#fff",
        fontFamily: 'JosefinSans',
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
        alignItems: 'center',
    },

    Card1: {
        width: 220,
        height: 380,
        borderRadius: 6,
        marginTop: 36,
        backgroundColor: '#9A8EB4'
    },

    tarotInfo: {
        width: '100%',
        height: 300,
    },

    nameContainer: {
        width: '100%',
        height: 60,
        backgroundColor: '#100C1A',
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tarotName: {
        fontFamily: 'JosefinSans',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
    },

    descContainer: {
        width: '100%',
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    tarotDesc: {
        fontFamily: 'JosefinSans',
        fontSize: 14,
        color: 'white',
        textTransform: 'uppercase',
        lineHeight: 24,
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