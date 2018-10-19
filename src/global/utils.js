import { Dimensions, Platform } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const getPlaceholder = (size) => `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios, android) => (
  Platform.select({ ios, android })
);

export default {
  deviceWidth,
  deviceHeight,
  platformSelect,
};
