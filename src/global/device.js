import { Dimensions, Platform } from 'react-native';

const PlatformOS = Platform.OS;
export const isIOS = PlatformOS === 'ios';
export const isAndroid = PlatformOS === 'android';
export const { width, height } = Dimensions.get('window');


export default {
  width,
  height,
  isIOS,
  isAndroid,
};
