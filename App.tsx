/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const data: Array<any> = [
    {id: 2, background: '#F05454'},
    {id: 4, background: '#D47AE8'},
    {id: 6, background: '#1597E5'},
    {id: 8, background: '#FFCC1D'},
    {id: 10, background: '#00C1D4'},
    {id: 12, background: '#F58840'},
  ];

  const card: Array<any> = [...data, ...data];

  const [steps, setSteps] = useState(0);
  const [cards, setCards] = useState(card);

  const isDarkMode = useColorScheme() === 'dark';

  const handleRestart = () => {
    setSteps(0);
    const shuffledCard = card.sort(() => Math.random() - 0.5);
    setCards(shuffledCard);
  };

  const handleFlipCard = () => {
    setSteps(steps + 1);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.restartBtnView}
            onPress={handleRestart}>
            <Text style={styles.restartBtn}>Restart</Text>
          </TouchableOpacity>
          <View style={styles.stepsView}>
            <Text style={styles.steps}>Steps: {steps}</Text>
          </View>
        </View>
        <View style={styles.container}>
          {cards.map((obj: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, {backgroundColor: obj.background}]}
              onPress={() => handleFlipCard()}>
              <View style={styles.cardFront}>
                <Text style={styles.cardNumber}>{obj.id}</Text>
              </View>
            </TouchableOpacity>
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
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  restartBtnView: {
    width: 130,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8E7F7F',
    padding: 10,
    borderRadius: 5,
  },
  restartBtn: {
    color: '#fff',
  },
  stepsView: {
    display: 'flex',
    height: 50,
    justifyContent: 'center',
  },
  steps: {
    fontSize: 20,
    color: '#000D6B',
  },
  card: {
    backgroundColor: '#FFF',
    width: 120,
    height: 130,
    margin: 4,

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    borderRadius: 3,
  },
  cardFront: {
    width: 120,
    height: 130,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
