import {StyleSheet} from 'react-native';

export const sharedStyles = StyleSheet.create({
  flex1: {
    flex: 1,
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
