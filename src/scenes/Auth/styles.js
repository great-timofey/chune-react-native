import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    marginBottom: 35,
  },
  loadIndicator: {
    //
  },
  loadMessage: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  enterButton: {
    justifyContent: 'center',
    backgroundColor: colors.accent,
    width: '100%',
    height: 45,
    borderRadius: 3,
  },
  enterButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 30,
    color: '#210130',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  loginInfo: {
    fontSize: 14,
    color: '#87768F',
  },
  snackBar: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    height: 44,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#D8D8D8',
  },
  snackBarButtonText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 20,
  },
  forgotPasswordButton: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#7B1FA2',
    fontSize: 16,
  },
});
