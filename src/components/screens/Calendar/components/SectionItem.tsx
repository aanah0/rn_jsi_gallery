import React, {FC, memo} from 'react';
import {View, StyleSheet} from 'react-native';
// import {colors} from '../../../../assets/colors';
import SectionEmptyItem from './SectionEmptyItem';

interface Props {
  data: null | Date;
}

const SectionItem: FC<Props> = ({data}) => {
  if (data === null) {
    return (
      <View style={styles.padding}>
        <SectionEmptyItem />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 20,
  },
});

export default memo(SectionItem);
