import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Keyboard,
  ProgressBarAndroid,
} from 'react-native';
import GreyColorButton from '../Button/GreyColorButton';
import InputFields from '../TextFields/InputFields';

//Color Constants
import colorConstants from '../Utils/Constants/ColorConstants';

//Image Constants
import stringConstants from '../Utils/Constants/StringConstants';

//Rest Api
import api from '../RestApi/API';

export default class EmailVerifyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validEmail: false,
      isLoading: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(colorConstants.black);
  }

  //--------------------------------------Validating Fields----------------------------
  handleEmailChange(email) {
    this.setState({emailAddress: email});

    if (!this.state.validEmail) {
      if (stringConstants.emailRegEx.test(email)) {
        this.setState({validEmail: true});
      }
    } else {
      if (!stringConstants.emailRegEx.test(email))
        this.setState({validEmail: false});
    }
  }

  sendOtp = () => {
    const {email, validEmail} = this.state;
    const nav = this.props.navigation.navigate;

    if (!validEmail) alert(stringConstants.invalidEmail);
    else {
      //---------------------When data is valid hit api service------------------------
      Keyboard.dismiss();

      this.setState({isLoading: true});

      api
        .resetPasswordService(email)
        .then(data => {
          console.log(data.data);
          this.setState({isLoading: false});

          if (data.data.status) {
            nav('ResetPassword', {
              otp: '1234',
            });
          } else {
            alert(data.data.msg);
          }
        })
        .catch(error => {
          this.setState({isLoading: false});
          alert('error: ' + error);
        });
    }
  };

  render() {
    return (
      // ------------------------------------------Main View--------------------------
      <View style={styles.wrapper}>
        {/* -------------------------------------Email Verification------------------------ */}
        <Text style={styles.textStyle}>Email Verification</Text>

        {/* ------------------------------------Email Input Field-------------------------- */}
        <View style={styles.inputFieldEmail}>
          <InputFields
            labelText="your email address"
            inputType="email"
            autoFocus={true}
            onChangeText={this.handleEmailChange}
          />
        </View>

        {/* -------------------Reset Password Button And Progress Loader-------------------- */}
        <View style={styles.buttonStyle}>
          {this.state.isLoading ? (
            <View>
              <ProgressBarAndroid />
            </View>
          ) : (
            <GreyColorButton
              text="Send OTP"
              textColor={colorConstants.white}
              handleOnPress={this.sendOtp}
            />
          )}
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
    flex: 0.1,
    color: colorConstants.white,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 40,
  },
  inputFieldEmail: {
    flex: 0.15,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 80,
  },
  buttonStyle: {
    flex: 0.5,
    marginTop: 10,
  },
});
