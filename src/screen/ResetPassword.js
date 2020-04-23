import React, {Component} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import GreyColorButton from '../Button/GreyColorButton';
import BlackColorButton from '../Button/BlackColorButton';
import InputFields from '../TextFields/InputFields';

//Color class
import colorConstants from '../Utils/Constants/ColorConstants';

//Image Constants
import imageConstants from '../Utils/Constants/ImageConstants';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      otp: '',
      confirmPassword: '',
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(colorConstants.black);
  }

  render() {
    // const nav = this.props.navigation.navigate;
    return (
      <View style={styles.wrapper}>
        {/* ----------------------------Reset Password Text--------------------------- */}
        <Text style={styles.textStyle}>Reset Password</Text>

        {/* --------------------------------OTP field--------------------------------- */}
        <View style={styles.otpStyle}>
          <InputFields
            labelText="enter OTP"
            inputType="email"
            autoFocus={true}
          />
        </View>

        {/* ---------------------------new password field------------------------------- */}
        <View style={styles.inputNewPassword}>
          <InputFields labelText="New Password" inputType="password" />
        </View>

        {/* ------------------------Confirm password field------------------------------ */}
        <View style={styles.inputConfirmPassword}>
          <InputFields labelText="Confirm Password" inputType="password" />
        </View>

        {/* ---------------------------Sumbmit Button----------------------------------- */}
        <View style={styles.buttonStyle}>
          <GreyColorButton text="Submit" textColor={colorConstants.white} />
        </View>

        {/* -----------------------Terms And Policy Text--------------------------------- */}
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
    justifyContent: 'center',
  },
  textStyle: {
    color: colorConstants.white,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 38,
  },
  inputConfirmPassword: {
    flex: 0.1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
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
  inputNewPassword: {
    flex: 0.1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  otpStyle: {
    flex: 0.15,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
  },
  buttonStyle: {
    flex: 0.5,
    marginTop: 10,
  },
});
