import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface IProps {
  steps: number;
  handleRestart: () => void;
}
export default function Header({steps, handleRestart}: IProps) {
  const {headerSection, restartBtnView, restartBtn, stepsView, stepsStyle} =
    styles;
  return (
    <View style={headerSection}>
      <TouchableOpacity style={restartBtnView} onPress={handleRestart}>
        <Text style={restartBtn}>Restart</Text>
      </TouchableOpacity>
      <View style={stepsView}>
        <Text style={stepsStyle}>Steps: {steps}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#9B0000',
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
  stepsStyle: {
    fontSize: 20,
    color: '#000D6B',
  },
});
