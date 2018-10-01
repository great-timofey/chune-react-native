import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  count: {
    fontWeight: 'bold',
    fontSize: 70
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 40,
    height: 40,
    margin: 8
  },
  buttonText: {
    color: 'black',
    fontSize: 24
  }
});
