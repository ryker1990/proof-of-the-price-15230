import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, StatusBar} from 'react-native';
import SplashScreen from './SplashScreen';
import GreyColorButton from '../Button/GreyColorButton';
import BlackColorButton from '../Button/BlackColorButton';

//Color class
import colorConstants from '../Utils/Constants/ColorConstants';

//Image Constants
import imageConstants from '../Utils/Constants/ImageConstants';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  //----------------------------------Load your Splash Screen For 3 seconds----------------------
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(colorConstants.black);
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    const nav = this.props.navigation.navigate;

    return (
      <View style={styles.wrapper}>
        {/* ---------------------------App Main Logo------------------------- */}
        <Image style={styles.logo} source={imageConstants.logoImg} />

        {/* //---------------------------Main Heading------------------------- */}
        <Text style={styles.textStyle}>"Make an informed</Text>
        <Text style={styles.textStyle}>decision.Negotiate</Text>
        <Text style={styles.textStyle}>the price or walk</Text>
        <Text style={styles.textStyle}>away."</Text>

        {/* ---------------------------Signup Button------------------------- */}
        <GreyColorButton
          text="Sign Up"
          textColor={colorConstants.white}
          handleOnPress={() => nav('SignUpScreen')}
        />

        {/* ---------------------------Signin Button------------------------- */}
        <BlackColorButton
          text="Sign In"
          textColor={colorConstants.white}
          handleOnPress={() => nav('LoginScreen')}
        />

        {/* ---------------------------Terms And Policy Button------------------------- */}
        <View style={styles.termsPrivacy}>
          <BlackColorButton text="Terms" textColor={colorConstants.white} />
          <BlackColorButton text="Privacy" textColor={colorConstants.white} />
        </View>
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
  logo: {
    height: 200,
    width: 280,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  textStyle: {
    color: colorConstants.white,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 28,
  },
  termsPrivacy: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
