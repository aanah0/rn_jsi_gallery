import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../assets/colors';
import {sharedStyles} from '../../../../assets/styles';

export const WONDEROUS_HEADER_HEIGHT = 50;

const WonderousHeader: FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.buttonConstraints, styles.buttonContainer]} />
      <View style={sharedStyles.flex1Center}>
        <Text style={styles.text}>GLOBAL TIMELINE</Text>
      </View>
      <View style={styles.buttonConstraints} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: WONDEROUS_HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonConstraints: {
    height: 32,
    width: 32,
  },
  buttonContainer: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 24,
  },
  text: {
    color: colors.primaryText,
  },
});

export default WonderousHeader;
