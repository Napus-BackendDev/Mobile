import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, Image } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 104;
const CARD_HEIGHT = 180;
const VISIBLE_CARDS = 5;

export default function HoroscopeScreen({ navigation, route }) {
  const { title } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Generate 78 cards
  const cards = Array.from({ length: 78 }, (_, index) => ({
    id: index,
    title: `Card ${index + 1}`
  }));

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const getInputRange = (index) => {
    const range = [];
    for (let i = -1; i <= 1; i++) {
      range.push((index + i) * CARD_WIDTH);
    }
    return range;
  };

  const renderCards = () => {
    // Calculate padding to center first and last cards
    const centerOffset = (width - CARD_WIDTH) / 2;
    const totalWidth = cards.length * CARD_WIDTH;
    const contentWidth = totalWidth + (centerOffset * 2);

    return (
      <View style={styles.cardsWrapper}>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={[
            styles.scrollContent,
            { 
              width: contentWidth,
              paddingLeft: centerOffset,
              paddingRight: centerOffset,
            }
          ]}
          onScroll={handleScroll}
        >
          {cards.map((card, index) => {
            const inputRange = getInputRange(index);
            
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            });

            return (
              <TouchableOpacity
                key={card.id}
                onPress={() => setCurrentIndex(index)}
                style={styles.cardWrapper}
              >
                <Animated.View
                  style={[
                    styles.card,
                    {
                      transform: [
                        { scale },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.cardIndex}>{card.id + 1}</Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </Animated.ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/img/Angle.png')} style={{ width: 24, height: 38 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {renderCards()}
      </View>

      {/* Swipe Indicator */}
      <View style={styles.swipeIndicator}>
        <Text style={styles.swipeText}>SWIPE</Text>
        <Image source={require('../../assets/img/SwipeLine.png')} style={{ width: 115, height: 10 }} />
      </View>

      {/* Bottom Text */}
      <Text style={styles.tapText}>TAP CARD TO SELECT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242049',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  backButton: {
    position: 'absolute',
    left: 19,
    padding: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 600,
    fontFamily: 'JosefinSans',
    textTransform: 'uppercase',
    marginTop: 8,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsWrapper: {
    width: width,
    overflow: 'hidden',
  },
  scrollContent: {
    flexDirection: 'row',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    margin: 0,
    padding: 0,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 0,
    padding: 0,
  },
  cardIndex: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#242049',
  },
  swipeIndicator: {
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 106,
  },
  swipeLine: {
    width: 200,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
    marginBottom: 10,
  },
  swipeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'JosefinSans',
    marginBottom: 3,
  },
  tapText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'JosefinSans',
    textAlign: 'center',
    marginBottom: 150,
  },
});