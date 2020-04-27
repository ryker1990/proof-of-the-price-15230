import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import GreyColorButton from '../Button/GreyColorButton';
import BlackColorButton from '../Button/BlackColorButton';
import InputFields from '../TextFields/InputFields';
import {TouchableOpacity} from 'react-native-gesture-handler';

//Color Constants
import colorConstants from '../Utils/Constants/ColorConstants';

//Image Constants
import stringConstants from '../Utils/Constants/StringConstants';

//Rest Api
import api from '../RestApi/API';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
      isLoading: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(colorConstants.black);
  }

  //--------------------------------------Validating Fields----------------------------
  handleEmailChange(email) {
    this.setState({email: email});

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

  //--------------------------------------End Of Validating Fields-------------------------

  login = () => {
    const {email, password, validEmail, validPassword} = this.state;

    if (!validEmail) alert(stringConstants.invalidEmail);
    else if (!validPassword) alert(stringConstants.invalidPassword);
    else {
      //---------------------When data is valid hit api service------------------------
      Keyboard.dismiss();

      this.setState({isLoading: true});

      api
        .signInService(email, password)
        .then(data => {
          console.log(data.data);
          this.setState({isLoading: false});

          if (data.data.status) {
            alert('Login Success');
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
    const nav = this.props.navigation.navigate;
    return (
      // ------------------------------------------Main View--------------------------
      <View style={styles.wrapper}>
        {/* -----------------------------------Sign in text----------------------------- */}
        <Text style={styles.textStyle}>Sign In</Text>

        {/* ---------------------------------------Email Input Field-------------------- */}
        <View style={styles.inputFieldEmail}>
          <InputFields
            labelText="your email address"
            inputType="email"
            autoFocus={true}
            onChangeText={this.handleEmailChange}
          />
        </View>

        {/* ---------------------------------------Password Input Field------------------- */}
        <View style={styles.inputFieldPassword}>
          <InputFields
            labelText="password"
            inputType="password"
            onChangeText={this.handlePasswordChange}
          />
        </View>

        {/* -------------------Sign in Button And Progress Loader-------------------------- */}
        <View style={styles.buttonStyle}>
          {this.state.isLoading ? (
            <View>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <GreyColorButton
              text="Sign In"
              textColor={colorConstants.white}
              handleOnPress={this.login}
            />
          )}

          {/* -------------------------------------Sign up Button-------------------------- */}
          <BlackColorButton
            text="Sign Up"
            textColor={colorConstants.white}
            handleOnPress={() => nav('SignUpScreen')}
          />

          {/* ----------------------------------Reset password Button--------------------- */}
          <TouchableOpacity onPress={() => nav('ForgotPassword')}>
            <Text style={styles.forgetPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        {/* -------------------------------------Terms And Policy Button--------------------- */}
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
  forgetPassword: {
    color: colorConstants.white,
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
});
