import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import styled from 'styled-components';

type Props = {
  loading: Boolean,
};

class Spinner extends Component<Props> {
  render() {
    const { loading } = this.props;
    const data = loading ? (
      <Overlay>
        <ActivityIndicator color="black" styles={{ flex: 1 }} size="large" />
      </Overlay>
    ) : null;

    return data;
  }
}

export default connect(({ common }) => ({ loading: common.loading }))(Spinner);

const Overlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
