import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

const Separator: FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.delimiter,
    height: 1,
  },
});

export default Separator;
