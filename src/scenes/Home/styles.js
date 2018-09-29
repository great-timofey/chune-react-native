import { StyleSheet } from 'react-native';
import { colors } from '../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: colors.flatBlue,
    borderRadius: 6
  },
  buttonText: {
    margin: 12,
    fontWeight: 'bold',
    color: 'black'
  }
});