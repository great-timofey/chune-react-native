import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HomeScreen from '../../screens/Home';

// export default class Some {
// render() {
// return (
// <ScrollableTabView>
// <HomeScreen tabLabel="React" />
// <HomeScreen tabLabel="React" />
// </ScrollableTabView>
// );
// }
// }

export default class Some {
  render() {
    return (
      <ScrollableTabView>
        <HomeScreen tabLabel="React" />
        <HomeScreen tabLabel="React" />
      </ScrollableTabView>
    );
  }
}
