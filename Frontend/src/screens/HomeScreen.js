import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Animated, PanResponder, Image } from "react-native";
import { useFonts } from 'expo-font';

export default function HomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
        'Jost': require('../../assets/fonts/Jost.ttf'),
    });

    const [selectedTopic, setSelectedTopic] = useState("Daily");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardContent, setCardContent] = useState("Daily");
    const [currentArray, setCurrentArray] = useState("timeFrame");
    const pan = useRef(new Animated.ValueXY()).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const timeFrame = ["Daily", "Monthly"];
    const lifeAspect = ["Love", "Financial", "Health", "Career"];
    const date = new Date();

    const getCurrentArray = () => {
        return currentArray === "timeFrame" ? timeFrame : lifeAspect;
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gesture) => {
                if (Math.abs(gesture.dx) > 100) {
                    const direction = gesture.dx > 0 ? -1 : 1;
                    const currentArray = getCurrentArray();
                    const newIndex = currentIndex + direction;
                    
                    // Animate card to back
                    Animated.parallel([
                        Animated.timing(pan.x, {
                            toValue: direction * 500,
                            duration: 300,
                            useNativeDriver: false
                        }),
                        Animated.timing(rotate, {
                            toValue: direction * 30,
                            duration: 300,
                            useNativeDriver: false
                        }),
                        Animated.timing(scale, {
                            toValue: 0.8,
                            duration: 300,
                            useNativeDriver: false
                        })
                    ]).start(() => {
                        // Reset card position
                        pan.setValue({ x: 0, y: 0 });
                        rotate.setValue(0);
                        scale.setValue(1);

                        // Handle array switching and index updates
                        if (newIndex >= currentArray.length) {
                            // Switch to lifeAspect if we're at the end of timeFrame
                            setCurrentArray("lifeAspect");
                            setCurrentIndex(0);
                            setSelectedTopic(lifeAspect[0]);
                            setCardContent(lifeAspect[0]);
                        } else if (newIndex < 0) {
                            if (currentArray === "lifeAspect") {
                                // Switch back to timeFrame if we're at the start of lifeAspect
                                setCurrentArray("timeFrame");
                                setCurrentIndex(timeFrame.length - 1);
                                setSelectedTopic(timeFrame[timeFrame.length - 1]);
                                setCardContent(timeFrame[timeFrame.length - 1]);
                            } else {
                                // Stay at the beginning of timeFrame
                                setCurrentIndex(0);
                                setSelectedTopic(timeFrame[0]);
                                setCardContent(timeFrame[0]);
                            }
                        } else {
                            // Normal case - stay in current array
                            setCurrentIndex(newIndex);
                            setSelectedTopic(currentArray[newIndex]);
                            setCardContent(currentArray[newIndex]);
                        }
                    });
                } else {
                    // Return card to original position
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false
                    }).start();
                }
            }
        })
    ).current;

    const handleTopicSelect = (topic, index) => {
        const array = timeFrame.includes(topic) ? "timeFrame" : "lifeAspect";
        setCurrentArray(array);
        setSelectedTopic(topic);
        setCurrentIndex(index);
        setCardContent(topic);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>FORTUNE</Text>
                <Text style={styles.subtitle}>FOR YOUR DAY, For Everyday</Text>
                <Text style={styles.date}>{date.toLocaleDateString('en-US', { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.cardContainer}>
                    <Animated.View 
                        style={[
                            styles.card,
                            {
                                transform: [
                                    { translateX: pan.x },
                                    { rotate: rotate.interpolate({
                                        inputRange: [-30, 0, 30],
                                        outputRange: ['-30deg', '0deg', '30deg']
                                    })},
                                    { scale: scale }
                                ]
                            }
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitle}>{cardContent}</Text>
                            <Text style={styles.cardSwipe}>SWIPE TO CHANGE</Text>
                            <Text style={styles.cardText}>TAP TO SELECT</Text>
                        </View>
                    </Animated.View>
                    <View style={[styles.cardBehind, {marginTop: 60, marginRight: 60, transform: [{ rotate: '4deg' }], backgroundColor: "#ADACAC"}]} />
                    <View style={[styles.cardBehind, {marginTop: 60, marginLeft: 60, transform: [{ rotate: '-4deg' }], backgroundColor: "#BFBFBF"}]} />
                    <View style={[styles.card, {zIndex: 1}]} />
                </View>
                <View style={styles.topicContainer}>
                    <View style={styles.topic}>
                        {timeFrame.map((topic, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleTopicSelect(topic, index)}
                                style={styles.topicItem}
                            >
                                <Text style={[styles.topicText, selectedTopic === topic && styles.topicTextSelected]}>
                                    {topic}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.topic}>
                        {lifeAspect.map((topic, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleTopicSelect(topic, index)}
                                style={styles.topicItem}
                            >
                                <Text style={[styles.topicText, selectedTopic === topic && styles.topicTextSelected]}>
                                    {topic}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242049",
        textTransform: 'uppercase',
        alignItems: 'center',
    },
    header: {
        width: '75vw',
        height: '10vh',
        marginTop: 60,
    },
    title: {
        fontSize: 36,
        fontWeight: 600,
        fontFamily: 'JosefinSans',
        color: "white",
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'JosefinSans',
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 10,
    },
    date: {
        fontSize: 12,
        color: "white",
        fontWeight: 500,
        fontFamily: 'Jost',
        marginTop: 10,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 135,
    },
    cardContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        width: '58vw',
        height: '46vh',
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        justifyContent: "end",
        alignItems: "center",
        position: "absolute",
        zIndex: 2,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardBehind: {
        width: '58vw',
        height: '46vh',
        borderRadius: 10,
        position: "absolute",
        zIndex: 1,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardTextContainer:{
        height: 200,
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.8)",
    },
    cardSwipe:{
        fontSize: 14,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.6)",
        marginTop: 50,
    },
    cardText: {
        fontSize: 14,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.6)",
    },
    topicContainer: {
        width: '80vw', 
        alignItems: 'center',

    },
    topic: {
        flexDirection: "row",
        gap: 20,
        alignItems: 'end',
    },
    topicItem: {
        paddingVertical: 10,
    },
    topicText: {
        fontFamily: 'JosefinSans',
        fontSize: 12,
        fontWeight: 600,
        color: "rgba(255, 255, 255, 0.8)",
    },
    topicTextSelected: {
        color: "#FFF",
        fontSize: 16,
    },
    topicSelected: {
        borderLeftWidth: 4,
        borderLeftColor: "#6FC1FF",
        paddingLeft: 6,
    },
});
