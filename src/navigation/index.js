import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';

import { setNavigatior, Auth, RootNavigator } from '../global/navigations';

const navRef = R.curry(setNavigatior)('HOME_NAVIGATOR');
const authNavRef = R.curry(setNavigatior)('AUTH_NAVIGATOR');

type Props = { isLoggedIn: boolean };

const AppNavigator = ({ isLoggedIn }: Props) => (isLoggedIn
  ? <RootNavigator ref={navRef} />
  : <Auth ref={authNavRef} />);

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({
  isLoggedIn,
});

export const connected = connect(mapStateToProps)(AppNavigator);  1 