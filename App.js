import {createAppContainer} from 'react-navigation';
import{createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './src/screen/WelcomeScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import LoginScreen from './src/screen/LoginScreen';
import ResetPassword from './src/screen/ResetPassword';
import ForgotPassword from './src/screen/ForgotPassword';

const Router = createStackNavigator(
  {
    LoginScreen,
    SignUpScreen,
    WelcomeScreen,
    ForgotPassword,
    ResetPassword
  },
  {
    initialRouteName: 'WelcomeScreen',
    headerMode: 'none',
  },
);
export default createAppContainer(Router);
