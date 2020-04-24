import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ProgressBarAndroid,
} from 'react-native';
import GreyColorButton from '../Button/GreyColorButton';
import BlackColorButton from '../Button/BlackColorButton';
import InputFields from '../TextFields/InputFields';

//Color class
import colorConstants from '../Utils/Constants/ColorConstants';

//String Constants
import stringConstants from '../Utils/Constants/StringConstants';

//Rest Api
import api from '../RestApi/API';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      otp: '',
      confirmPassword: '',
      validOtp: false,
      validPassword: false,
      passwordMatch: false,
      isLoading: false,
    };

    this.handleOtpChange = this.handleOtpChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this,
    );
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(colorConstants.black);
  }

  //--------------------------------------Validating Fields----------------------------

  handleOtpChange(otp) {
    var otpProp = this.props.otp;

    if (otp == otpProp) {
      this.setState({validOtp: true});
    } else {
      this.setState({validOtp: false});
    }
  }

  handlePasswordChange(password) {
    this.setState({password: password});

    if (password.length < 6) {
      this.setState({validPassword: false});
    } else {
      this.setState({validPassword: true});
    }
  }

  handleConfirmPasswordChange(confirmPassword) {
    password = this.state.password;

    if (confirmPassword == password) {
      this.setState({passwordMatch: true});
    } else {
      this.setState({passwordMatch: false});
    }
  }

  //--------------------------------------End Of Validating Fields-------------------------

  sumbit() {
    const {otp, password, validOtp, validPassword, passwordMatch} = this.state;

    if (!validOtp) alert(stringConstants.invalidOtp);
    else if (!validPassword) alert(stringConstants.invalidPassword);
    else if (!passwordMatch) alert(stringConstants.invalidConfirmPassword);
    else {
      api
        .addNewPasswordService(otp, password)
        .then(data => {
          console.log(data.data);
          this.setState({isLoading: false});
          alert(data.data.msg);
        })
        .catch(error => {
          this.setState({isLoading: false});
          alert('error: ' + error);
        });
    }
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
            onChangeText={this.handleOtpChange}
          />
        </View>

        {/* ---------------------------new password field------------------------------- */}
        <View style={styles.inputNewPassword}>
          <InputFields
            labelText="New Password"
            inputType="password"
            onChangeText={this.handlePasswordChange}
          />
        </View>

        {/* ------------------------Confirm password field------------------------------ */}
        <View style={styles.inputConfirmPassword}>
          <InputFields
            labelText="Confirm Password"
            inputType="password"
            onChangeText={this.handleConfirmPasswordChange}
          />
        </View>

        {/* ---------------------------Sumbmit Button----------------------------------- */}
        <View style={styles.buttonStyle}>
          {this.state.isLoading ? (
            <View>
              <ProgressBarAndroid />
            </View>
          ) : (
            <GreyColorButton
              text="Submit"
              textColor={colorConstants.white}
              handleOnPress={this.sumbit}
            />
          )}
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