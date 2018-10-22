import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';

import {
  setNavigatior,
  Auth,
  RootNavigator,
  MainNavigator,
} from '../global/navigations';

const navRef = R.curry(setNavigatior)('HOME_NAVIGATOR');
const drawRef = R.curry(setNavigatior)('DRAWER_NAVIGATOR');
const authNavRef = R.curry(setNavigatior)('AUTH_NAVIGATOR');

type Props = { isLoggedIn: boolean };

const AppNavigator = ({ isLoggedIn }: Props) => (isLoggedIn ? <MainNavigator ref={drawRef} /> : <Auth ref={authNavRef} />);

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({
  isLoggedIn,
});

export const connected = connect(mapStateToProps)(AppNavigator);
