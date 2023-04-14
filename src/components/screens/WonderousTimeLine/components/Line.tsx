import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../assets/colors';
import {screenWidth} from '../../../../assets/styles';

interface Props {
  availableHeight: number;
}

const Line: FC<Props> = ({availableHeight = screenWidth}) => {
  const top = availableHeight / 2;

  return (
    <View style={[styles.container, {top}]}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>3000 BCE</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screenWidth,
    alignItems: 'flex-end',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.secondaryText,
  },
  textContainer: {
    position: 'absolute',
    right: 0,
    top: -20,
    paddingRight: 20,
    paddingBottom: 6,
  },
  text: {
    fontSize: 16,
    color: colors.primaryText,
  },
});

export default Line;
