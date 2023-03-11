import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../../../assets/colors';

interface Props {
  title: string;
}

const SectionHeader: FC<Props> = ({title}) => {
  const primaryText = title.split(' ')[0];
  const secondaryText = title.substring(title.indexOf(' '));

  return (
    <View style={styles.container}>
      <Text style={styles.primaryText}>
        {primaryText + ' '}
        <Text style={styles.secondaryText}>{secondaryText}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  primaryText: {
    color: colors.primaryText,
    fontSize: 18,
  },
  secondaryText: {
    color: colors.secondaryText,
    fontSize: 16,
  },
});

export default SectionHeader;
