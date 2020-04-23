import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import LoginScreen from './src/Screens/LoginScreen';
import ResetPassword from './src/Screens/ResetPassword';
import ForgotPassword from './src/Screens/ForgotPassword';
import EmailVerify from './src/Screens/EmailVerifyScreen';

const Router = createStackNavigator(
  {
    LoginScreen,
    SignUpScreen,
    WelcomeScreen,
    ForgotPassword,
    ResetPassword,
    EmailVerify,
  },
  {
    initialRouteName: 'WelcomeScreen',
    headerMode: 'none',
  },
);
export default createAppContainer(Router);
