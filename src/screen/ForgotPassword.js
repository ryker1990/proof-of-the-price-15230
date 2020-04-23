import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import GreyColorButton from '../Button/GreyColorButton';
import BlackColorButton from '../Button/BlackColorButton';
import InputFields from '../TextFields/InputFields';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(colorConstants.black);
  }

  render() {
    const nav = this.props.navigation.navigate;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.textStyle}>Forgot Password</Text>

        <View style={styles.inputFieldEmail}>
          <InputFields
            labelText="enter email address"
            labelTextSize={20}
            inputType="email"
            autoFocus={true}
          />
        </View>

        <View style={styles.buttonStyle}>
          <GreyColorButton text="Submit" textColor={'#FFFFFF'} />
        </View>

        <View style={styles.termsPrivacy}>
          <BlackColorButton text="Terms" textColor={'#FFFFFF'} />
          <BlackColorButton text="Privacy" textColor={'#FFFFFF'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  textStyle: {
    flex: 0.1,
    color: '#FFFFFF',
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
});
