import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {screenHeight} from '../../../../assets/styles';

export const useAvailableHeight = () => {
  const {top} = useSafeAreaInsets();

  return screenHeight - top;
};
