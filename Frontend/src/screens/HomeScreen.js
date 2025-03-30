import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Animated, PanResponder, Image } from "react-native";
import { useFonts } from 'expo-font';

export default function HomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
        'Jost': require('../../assets/fonts/Jost.ttf'),
    });
    
    const [selectedTopic, setSelectedTopic] = useState("Daily");
    const [currentIndex, setCurrentIndex] = useState(0);
    const topicRef = useRef(selectedTopic);
    const indexRef = useRef(currentIndex);
    const pan = useRef(new Animated.ValueXY()).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    
    const timeFrame = ["Daily", "Monthly"];
    const lifeAspect = ["Love", "Financial", "Health", "Career"];
    const topicArray = [...timeFrame, ...lifeAspect];
    const date = new Date();

    useEffect(() => {
        topicRef.current = selectedTopic;
        indexRef.current = currentIndex;
    }, [topicRef, currentIndex]); 

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gesture) => {
                if (Math.abs(gesture.dx) > 290) {
                    const direction = gesture.dx > 0 ? -1 : 1;

                    // Animate card to back
                    Animated.timing(pan.x, {
                        toValue: direction,
                        duration: 300,
                        useNativeDriver: false
                    }).start(() => {
                        // Reset card position
                        pan.setValue({ x: 0, y: 0 });

                        // Handle array and index updates
                        if (direction === 1) {
                            const newIndex = (indexRef.current + 1) % 6;
                            setSelectedTopic(topicArray[newIndex]);
                            setCurrentIndex(newIndex);
                        } else {
                            let newIndex = (indexRef.current - 1) % 6;
                            if (newIndex === -1) {
                                newIndex = 5;
                            }
                            setSelectedTopic(topicArray[newIndex]);
                            setCurrentIndex(newIndex);
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
    
    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
        topicArray.map((topics, index) => {
            if (topics === topic) {
                setCurrentIndex(index);
            } 
        })
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
                                zIndex: pan.x.interpolate({
                                    inputRange: [-290, 0, 290],
                                    outputRange: [-1, 2, -1],
                                    extrapolate: 'clamp',
                                }),
                                transform: [
                                    { translateX: pan.x },
                                ]
                            }
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.cardTextContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Horoscope', { title: selectedTopic })}
                                style={styles.cardTextContainer}
                            >
                                <Text style={styles.cardTitle}>{selectedTopic}</Text>
                                <Text style={styles.cardSwipe}>SWIPE TO CHANGE</Text>
                                <Text style={styles.cardText}>TAP TO SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <View style={[styles.cardBehind, {marginTop: 60, marginRight: 60, transform: [{ rotate: '4deg' }], backgroundColor: "#ADACAC"}]} />
                    <View style={[styles.cardBehind, {marginTop: 60, marginLeft: 60, transform: [{ rotate: '-4deg' }], backgroundColor: "#BFBFBF"}]} />
                    <View style={[styles.card, {zIndex: 1}]} />
                </View>
                <View style={styles.topicContainer}>
                    <View style={styles.topic}>
                        {timeFrame.map((topic) => (
                            <TouchableOpacity
                                onPress={() => handleTopicSelect(topic)}
                                style={styles.topicItem}
                            >
                                <Text style={[styles.topicText, selectedTopic === topic && styles.topicTextSelected]}>
                                    {topic}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.topic}>
                        {lifeAspect.map((topic) => (
                            <TouchableOpacity
                                onPress={() => handleTopicSelect(topic)}
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