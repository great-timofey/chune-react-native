import { Dimensions, Platform } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const getPlaceholder = size => `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios, android) => Platform.select({ ios, android });

export const isIphoneX = Platform.OS === 'ios' && (deviceWidth === 812 || deviceHeight === 812);

export default {
  isIphoneX,
  deviceWidth,
  deviceHeight,
  getPlaceholder,
  platformSelect,
};
