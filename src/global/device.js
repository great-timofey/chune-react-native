import { Dimensions, Platform } from 'react-native';

const PlatformOS = Platform.OS;
export const isIOS = PlatformOS === 'ios';
export const isAndroid = PlatformOS === 'android';
export const { width, height } = Dimensions.get('window');
export const isIphoneX = Platform.OS === 'ios' && (width === 812 || height === 812);

export default {
  isIOS,
  width,
  height,
  isIphoneX,
  isAndroid,
};
