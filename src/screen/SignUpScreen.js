import React, {Component} from 'react';
import {View, StyleSheet, Text, Keyboard, StatusBar} from 'react-native';
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

    // const {navigate} = this.props.navigation;

    if (!validEmail) alert(stringConstants.invalidEmail);
    else if (!validPassword) alert(stringConstants.invalidPassword);
    else if (!validZipCode) alert(stringConstants.invalidZipCode);
    else {
      Keyboard.dismiss();
      // alert('Success');

      api
        .signUpService(emailAddress, password, zipCode)
        .then((data) => {
          console.log(data);
          alert('success');
        })
        .catch((error) => {
          alert('error');
        });

      // fetch(
      //   'http://ec2-3-22-171-171.us-east-2.compute.amazonaws.com/api/signup',
      //   {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       userType: 'user',
      //       email: email_address,
      //       password: password,
      //       zipcode: zipcode,
      //     }),
      //   },
      // )
      //   .then(response => response.json())
      //   .then(res => {
      //     console.log(res);
      //     if (res.status === '1') {
      //       var data = res.data;
      //       console.log(data);
      //     } else {
      //       alert(res.message);
      //     }
      //   })
      //   .done();
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
          {/* -------------------------------Signup Button---------------------------- */}
          <GreyColorButton
            text="Sign Up"
            textColor={colorConstants.white}
            handleOnPress={this.signUpForm}
          />

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
