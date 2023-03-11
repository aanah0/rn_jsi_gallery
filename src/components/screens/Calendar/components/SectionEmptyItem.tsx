import React, {FC, memo, useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../../assets/colors';

const SectionEmptyItem: FC = () => {
  const onPress = useCallback(() => {
    console.log('OnPress');
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Create Daily Note</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: colors.secondaryText,
    fontSize: 14,
  },
});

export default memo(SectionEmptyItem);
