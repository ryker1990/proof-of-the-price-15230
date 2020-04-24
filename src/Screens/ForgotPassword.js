import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Keyboard,
  ProgressBarAndroid,
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

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
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
    const {emailAddress, validEmail} = this.state;
    const nav = this.props.navigation.navigate;

    if (!validEmail) alert(stringConstants.invalidEmail);
    else {
      //---------------------When data is valid hit api service------------------------
      Keyboard.dismiss();

      this.setState({isLoading: true});

      api
        .resetPasswordService(emailAddress)
        .then(data => {
          console.log(data.data);
          this.setState({isLoading: false});

          if (data.data.status) {
            alert(data.data.msg);
            nav('ResetPassword', {
              otp: data.data.token,
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

  //Enter your email below to recieve password reset instructions

  render() {
    return (
      // ------------------------------------------Main View--------------------------
      <View style={styles.wrapper}>
        {/* -------------------------------------Forgot Password------------------------ */}
        <Text style={styles.textStyle}>Forgot Password</Text>

        {/* ------------------------------------Email Input Field----------------------- */}
        <View style={styles.inputFieldEmail}>
          <InputFields
            labelText="your email address"
            inputType="email"
            autoFocus={true}
            onChangeText={this.handleEmailChange}
          />
        </View>

        {/* -------------------Reset Password Button And Progress Loader-------------------------- */}
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

// import React, {Component} from 'react';
// import {
//   Image,
//   View,
//   StyleSheet,
//   Text,
//   KeyboardAvoidingView,
// } from 'react-native';
// import GreyColorButton from '../Button/GreyColorButton';
// import BlackColorButton from '../Button/BlackColorButton';
// import InputFields from '../TextFields/InputFields';

// export default class ForgotPassword extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//     };
//   }

//   componentDidMount() {
//     StatusBar.setBarStyle('light-content', true);
//     StatusBar.setBackgroundColor(colorConstants.black);
//   }

//   render() {
//     const nav = this.props.navigation.navigate;
//     return (
//       <View style={styles.wrapper}>
//         <Text style={styles.textStyle}>Forgot Password</Text>

//         <View style={styles.inputFieldEmail}>
//           <InputFields
//             labelText="enter email address"
//             labelTextSize={20}
//             inputType="email"
//             autoFocus={true}
//           />
//         </View>

//         <View style={styles.buttonStyle}>
//           <GreyColorButton text="Submit" textColor={'#FFFFFF'} />
//         </View>

//         <View style={styles.termsPrivacy}>
//           <BlackColorButton text="Terms" textColor={'#FFFFFF'} />
//           <BlackColorButton text="Privacy" textColor={'#FFFFFF'} />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//   },
//   textStyle: {
//     flex: 0.1,
//     color: '#FFFFFF',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     alignItems: 'center',
//     fontSize: 40,
//   },
//   termsPrivacy: {
//     flex: 1,
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 0,
//     paddingBottom: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputFieldPassword: {
//     flex: 0.1,
//     flexDirection: 'column',
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   inputFieldEmail: {
//     flex: 0.15,
//     flexDirection: 'column',
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 80,
//   },
//   buttonStyle: {
//     flex: 0.5,
//     marginTop: 10,
//   },
// });
