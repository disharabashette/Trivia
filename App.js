import React from "react";
import NavigationContainer from "./src/shared/NavigationContainer";
import { Provider } from "react-redux";
import Store from './src/store/Store'

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigationContainer/>
      </Provider>
    );
  }
}