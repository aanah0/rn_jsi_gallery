import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../../assets/colors';
import Spacer from '../../../common/Spacer';

export const YEAR_ITEM_SUB_STEP_HEIGHT = 5;
export const YEAR_ITEM_STEP_SPACER = YEAR_ITEM_SUB_STEP_HEIGHT * 10;
export const YEAR_ITEM_DEFAULT_HEIGHT = 18;
export const YEAR_ITEM_EXPANDED_HEIGHT =
  YEAR_ITEM_DEFAULT_HEIGHT + YEAR_ITEM_STEP_SPACER;

export const YEAR_ITEM_WIDTH = 60;

interface Props {
  year: number;
  spacer?: boolean;
}

const YearItem: FC<Props> = ({year, spacer}) => {
  return (
    <View style={[styles.container, spacer && styles.expandedHeight]}>
      <Text style={styles.text}>{year}</Text>
      {spacer ? <Spacer height={YEAR_ITEM_STEP_SPACER} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    height: YEAR_ITEM_DEFAULT_HEIGHT,
    overflow: 'visible',
    width: YEAR_ITEM_WIDTH,
  },
  text: {
    color: colors.primaryText,
    fontSize: 14,
    lineHeight: YEAR_ITEM_DEFAULT_HEIGHT,
    overflow: 'visible',
  },
  expandedHeight: {
    height: YEAR_ITEM_EXPANDED_HEIGHT,
  },
});

export default YearItem;
