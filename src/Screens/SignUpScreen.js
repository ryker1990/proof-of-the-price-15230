import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  StatusBar,
  ProgressBarAndroid,
} from 'react-native';
import GreyColorButton from '../Button/GreyColorButton';
import BlackColorButton from '../Button/BlackColorButton';
import InputFields from '../TextFields/InputFields';

//Color class
import colorConstants from '../Utils/Constants/ColorConstants';

//String constants
import stringConstants from '../Utils/Constants/StringConstants';

//Rest API's
import api from '../RestApi/API';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      owner: false,
      zipcode: '',
      status: true,
      validEmail: false,
      validPassword: false,
      validZipCode: false,
      isLoading: false,
    };
    this.signUpForm = this.signUpForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
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

  handlePasswordChange(password) {
    this.setState({password: password});

    if (password.length < 6) {
      this.setState({validPassword: false});
    } else {
      this.setState({validPassword: true});
    }
  }

  handleZipCodeChange(zipCode) {
    this.setState({zipCode: zipCode});

    if (zipCode.length < 6) {
      this.setState({validZipCode: false});
    } else {
      this.setState({validZipCode: true});
    }
  }

  //--------------------------------------End Of Validating Fields-------------------------

  signUpForm = () => {
    const {
      validEmail,
      validPassword,
      validZipCode,
      emailAddress,
      password,
      zipCode,
    } = this.state;

    const {state, goBack} = this.props.navigation;

    if (!validEmail) alert(stringConstants.invalidEmail);
    else if (!validPassword) alert(stringConstants.invalidPassword);
    else if (!validZipCode) alert(stringConstants.invalidZipCode);
    else {
      //---------------------When data is valid hit api service------------------------
      Keyboard.dismiss();

      this.setState({isLoading: true});

      api
        .signUpService(emailAddress, password, zipCode)
        .then((data) => {
          console.log(data.data);
          this.setState({isLoading: false});
          if (data.data.status) {
            alert(data.data.msg);
            //-------------------Sending Back To The Login Screen-----------------------
            goBack();
          } else {
            alert(data.data.msg);
          }
        })
        .catch((error) => {
          this.setState({isLoading: false});
          alert('error: ' + error);
        });
    }
  };

  render() {
    const nav = this.props.navigation.navigate;
    return (
      <View style={styles.wrapper}>
        {/* -------------------------------Signup text----------------------------- */}
        <Text style={styles.textStyle}>Sign Up</Text>
        {/* -------------------------------Email Field----------------------------- */}
        <View style={styles.inputFieldEmail}>
          <InputFields
            labelText="your email address"
            autoFocus={true}
            onChangeText={this.handleEmailChange}
          />
        </View>
        {/* -------------------------------Password Field--------------------------- */}
        <View style={styles.inputFieldPassword}>
          <InputFields
            labelText="password"
            inputType="password"
            onChangeText={this.handlePasswordChange}
          />
        </View>
        {/* -------------------------------Zipcode Field----------------------------- */}
        <View style={styles.inputFieldZipCode}>
          <InputFields
            labelText="ZipCode"
            maxLength={6}
            inputType="number"
            onChangeText={this.handleZipCodeChange}
          />
        </View>
        <View style={styles.buttonStyle}>
          {/* ---------------------Signup Button And Progress bar-------------------- */}

          {this.state.isLoading ? (
            <View>
              <ProgressBarAndroid />
            </View>
          ) : (
            <GreyColorButton
              text="Sign Up"
              textColor={colorConstants.white}
              handleOnPress={this.signUpForm}
            />
          )}

          {/* -------------------------------Signin Button----------------------------- */}
          <BlackColorButton
            text="Sign In"
            textColor={colorConstants.white}
            handleOnPress={() => nav('LoginScreen')}
          />
        </View>

        {/* -------------------------Terms And Privacy Text----------------------------- */}
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
  toggleStyle: {
    backgroundColor: colorConstants.black,
    alignItems: 'center',
    marginTop: 10,
  },
  progressBar: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textStyle: {
    flex: 0.1,
    color: colorConstants.white,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 40,
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
  inputFieldPassword: {
    flex: 0.1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  inputFieldEmail: {
    flex: 0.1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  inputFieldZipCode: {
    flex: 0.1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  buttonStyle: {
    flex: 0.4,
    marginTop: 8,
  },
});
