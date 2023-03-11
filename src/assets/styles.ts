import {StyleSheet, Dimensions} from 'react-native';
import {colors} from './colors';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const sharedStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  screenWrap: {
    backgroundColor: colors.background,
    flex: 1,
  },
  textPrimaryColor: {
    color: colors.primaryText,
  },
  textSecondaryColor: {
    color: colors.secondaryText,
  },
  row: {
    flexDirection: 'row',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowAlignCenterJustifySpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAlignCenterJustifyCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  wh100: {
    width: '100%',
    height: '100%',
  },
});
