import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const scaleFont = (size) => size * PixelRatio.getFontScale();
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const pathShapeDefault =
  'M0,6 C0,2.68629 2.68629,0 6,0 H29 C32.3137,0 35,2.68629 35,6 V52 C35,55.3137 32.3137,58 29,58 H6 C2.68629,58 0,55.3137 0,52 Z';

const pathShape1 =
  'M0 6.55367C0 3.03148 3.01971 0.266884 6.52823 0.576971L29.5282 2.60973C32.6251 2.88344 35 5.47744 35 8.58644V49.4136C35 52.5226 32.6251 55.1166 29.5282 55.3903L6.52822 57.423C3.0197 57.7331 0 54.9685 0 51.4463V6.55367Z';

export default function SplashIntroScreen() {
  const [pathD, setPathD] = useState(pathShapeDefault);
  const nav = useNavigation();

  const cardY = useSharedValue(height);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const logoX = useSharedValue(30);
  const cardX = useSharedValue(0);
  const miniScale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const rotateY = useSharedValue(1);

  const finalCardWidth = width * 0.09;
  const finalCardHeight = height * 0.09;
  const textBlockWidth = 150;
  const textBlockHeight = 40;
  const spacing = 35;

  const totalWidth = finalCardWidth + spacing + textBlockWidth;
  const finalLeft = width / 2 - totalWidth / 2;
  const finalTop = height / 2 - finalCardHeight / 2;

  const initialCardWidth = width * 0.25;
  const initialCardHeight = height * 0.25;

  const cardWidth = useSharedValue(initialCardWidth);
  const cardHeight = useSharedValue(initialCardHeight);
  const cardTop = useSharedValue(height / 2 - initialCardHeight / 2);
  const cardLeft = useSharedValue(width / 2 - initialCardWidth / 2);

  const svgProps = useAnimatedProps(() => ({
    width: cardWidth.value,
    height: cardHeight.value,
  }));

  const svgWrapperStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: cardTop.value + cardY.value,
    left: cardLeft.value + cardX.value,
    transform: [
      { perspective: 800 },
      { rotateZ: `${rotateZ.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { scale: scale.value * miniScale.value },
    ],
  }));

  const textWrapperStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: textBlockWidth,
    height: textBlockHeight,
    top: cardTop.value + cardY.value + (cardHeight.value - textBlockHeight) / 2+6,
    left: cardLeft.value + cardWidth.value + spacing,
    opacity: opacity.value,
    transform: [{ translateX: logoX.value }],
  }));

  useEffect(() => {
    cardY.value = withTiming(height / 2 - height * 0.6, { duration: 1000 });

    cardWidth.value = withDelay(2000, withTiming(finalCardWidth, { duration: 600 }));
    cardHeight.value = withDelay(2000, withTiming(finalCardHeight, { duration: 600 }));
    cardLeft.value = withDelay(2000, withTiming(finalLeft, { duration: 600 }));
    cardTop.value = withDelay(2000, withTiming(finalTop, { duration: 600 }));

    setTimeout(() => {
      runOnJS(setPathD)(pathShape1);
    }, 2000);

    opacity.value = withDelay(2000, withTiming(1, { duration: 600 }));
    logoX.value = withDelay(2000, withTiming(0, { duration: 600 }));

    scale.value = withDelay(
      3400,
      withTiming(20, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      }, () => {
        runOnJS(nav.replace)('TabNavigator');
      })
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* Gradient Text - FORTUNE */}
      <Animated.View style={textWrapperStyle}>
        <MaskedView
          style={{ flex: 1 }}
          maskElement={
            <View style={styles.centered}>
              <Text style={styles.text}>FORTUNE</Text>
            </View>
          }
        >
          <LinearGradient
            colors={['#FFFDFD', '#FFE9E9']} // สี gradient สว่างสุดในโทนชมพู
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: textBlockWidth, height: textBlockHeight }}
          />
        </MaskedView>
      </Animated.View>

      {/* Animated Card */}
      <Animated.View style={svgWrapperStyle}>
        <AnimatedSvg animatedProps={svgProps} viewBox="0 0 35 58">
          <Path d={pathD} fill="#FF7575" />
        </AnimatedSvg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDEAFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'JosefinSans',
    fontSize: scaleFont(40),
    fontWeight: '400',
    lineHeight: scaleFont(40),
    textAlign: 'center',
    color: 'black', // บังคับเพื่อให้ mask ใช้ได้ แต่ไม่แสดงจริง
    backgroundColor: 'transparent',
  },
});
