import React, {Component} from 'react';
import {Image, View, StyleSheet, StatusBar} from 'react-native';

//Color Constants
import colorConstants from '../Utils/Constants/ColorConstants';

//Image Constants
import imageConstants from '../Utils/Constants/ImageConstants';

export default class SplashScreen extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(colorConstants.black);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {/* ---------------------------------Main Logo Image----------------------- */}
        <Image style={styles.imageStyle} source={imageConstants.logoImg} />
      </View>
    );
  }
}

{
  /* ---------------------------StyleSheet------------------------- */
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colorConstants.black,
  },
  imageStyle: {
    flex: 1,
    height: 250,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});
