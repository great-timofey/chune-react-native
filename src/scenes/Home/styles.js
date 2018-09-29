import { StyleSheet } from 'react-native';
import { colors } from '../../global';

export default StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.flatBlue,
    borderRadius: 6,
  },
  buttonText: {
    margin: 12,
    fontWeight: 'bold',
    color: 'black',
  },
});
