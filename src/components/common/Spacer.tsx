import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
  height?: number;
  width?: number;
  flex?: number;
}

const Spacer = ({height = 0, width = 0, flex}: SpacerProps) => {
  return <View style={styles.container(height ?? 0, width ?? 0, flex)} />;
};

const styles = {
  container(height: number, width: number, flex: number | undefined) {
    return {
      height,
      width,
      flex,
    };
  },
};

export default Spacer;
