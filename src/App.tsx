/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Animated,
  Pressable,
  Image,
} from 'react-native';
import Header from './components/Header';

const data: Array<any> = [
  {id: 2, background: '#FF7272'},
  {id: 4, background: '#D47AE8'},
  {id: 6, background: '#1597E5'},
  {id: 8, background: '#FFCC1D'},
  {id: 10, background: '#00C1D4'},
  {id: 12, background: '#F58840'},
];

const cardsArr: Array<any> = [...data, ...data];

function shuffleCards(array: Array<any>) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

const App = () => {
  const [cards, setCards] = useState<Array<any>>(cardsArr);
  const [openCards, setOpenCards] = useState<Array<any>>([]);
  const [clearedCards, setClearedCards] = useState<any>({});
  const [steps, setSteps] = useState<number>(0);
  // const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const timeout = useRef(null);

  const isDarkMode = useColorScheme() === 'dark';

  const animatedValue = useRef(new Animated.Value(0)).current;

  let frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  let backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  let frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  let backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  let elevationFront = animatedValue.interpolate({
    inputRange: [0, 15],
    outputRange: [10, 0],
  });

  let elevationBack = animatedValue.interpolate({
    inputRange: [155, 180],
    outputRange: [0, 10],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const flipToFront = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.spring(animatedValue, {
      toValue: 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const evaluate = () => {
    const [first, second] = openCards;
    console.log('evaluate', openCards, first, second);
    if (cards[first].id === cards[second].id) {
      console.log('evaluate in', cards[first].id, cards[second].id);
      flipToBack();
      setClearedCards((prev: any) => ({...prev, [cards[first].id]: true}));
      setOpenCards([]);
      return;
    } else {
      setTimeout(() => {
        flipToFront();
      }, 700);
    }
    //flip the cards back after 1000ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 1000);
  };

  const handleCardClick = (index: any) => {
    flipToBack();
    if (openCards.length === 1) {
      setOpenCards(prev => [...prev, index]);
      setSteps(steps + 1);
    } else {
      // clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timingOut: any = null;
    if (openCards.length === 2) {
      timingOut = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timingOut);
    };
  }, [openCards]);

  const handleRestart = () => {
    flipToFront();
    setClearedCards({});
    setOpenCards([]);
    setSteps(0);
    setCards(shuffleCards(cardsArr));
  };

  const {cardView, card, cardFront, cardBack, cardImgStyle, cardNumber} =
    styles;

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header steps={steps} handleRestart={handleRestart} />
        <View style={styles.container}>
          {cards.map((obj: any, index: number) => (
            <Pressable
              style={card}
              onPress={() => handleCardClick(index)}
              key={index}>
              <View style={cardView}>
                <Animated.View
                  style={[
                    frontAnimatedStyle,
                    cardFront,
                    {elevation: elevationFront},
                    {opacity: frontOpacity},
                  ]}>
                  <Image
                    source={require('../images/card-front.png')}
                    style={cardImgStyle}
                  />
                </Animated.View>
                <Animated.View
                  style={[
                    backAnimatedStyle,
                    {backgroundColor: obj.background},
                    cardBack,
                    {elevation: elevationBack},
                    {opacity: backOpacity},
                  ]}>
                  <Text style={cardNumber}>{obj.id}</Text>
                </Animated.View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardView: {
    position: 'relative',
  },
  card: {
    backgroundColor: '#FFF',
    width: 120,
    height: 135,
    margin: 4,

    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
  },
  cardFront: {
    borderRadius: 10,
    width: 120,
    height: 135,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cardImgStyle: {
    width: 70,
    height: 70,
  },
  cardBack: {
    borderRadius: 10,
    width: 120,
    height: 135,
    // position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
