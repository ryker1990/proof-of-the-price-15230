import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
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
      otp: 12,
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
    this.sumbit = this.sumbit.bind(this);
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(colorConstants.black);
  }

  //--------------------------------------Validating Fields----------------------------

  handleOtpChange(otp) {
    const {state} = this.props.navigation;
    var otpProp = '' + state.params.otp;
    this.setState({otp: otp});

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
    const nav = this.props.navigation.navigate;

    if (!validOtp) alert(stringConstants.invalidOtp);
    else if (!validPassword) alert(stringConstants.invalidPassword);
    else if (!passwordMatch) alert(stringConstants.invalidConfirmPassword);
    else {
      api
        .addNewPasswordService(parseInt(otp), password)
        .then(data => {
          console.log(data.data);
          this.setState({isLoading: false});

          if (data.data.status) {
            alert(data.data.msg);
            nav('LoginScreen');
          } else {
            alert(data.data.msg);
          }
        })
        .catch(error => {
          this.setState({isLoading: false});
          alert('error: ' + error);
        });
    }
  }

  render() {
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
              <ActivityIndicator size={'large'} />
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
