import axios from 'axios';

//String Constants
import stringConstants from '../Utils/Constants/StringConstants';

class API {
  //----------------------------------------------------SignUp API--------------------------------------
  signUpService = async (emailStr, passwordStr, zipCodeStr) => {
    return await new Promise((resolve, reject) => {
      axios
        .post(stringConstants.baseURL + 'signup', {
          userType: 'user',
          email: emailStr,
          password: passwordStr,
          zipcode: zipCodeStr,
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  };

  //----------------------------------------------------SignIn API--------------------------------------
  signInService = async (emailStr, passwordStr) => {
    return await new Promise((resolve, reject) => {
      axios
        .post(stringConstants.baseURL + 'signin', {
          email: emailStr,
          password: passwordStr,
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  };

  //----------------------------------------------------ResetPassword API--------------------------------------
  resetPasswordService = async emailStr => {
    return await new Promise((resolve, reject) => {
      axios
        .post(stringConstants.baseURL + 'reset-password', {
          email: emailStr,
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  };

  //----------------------------------------------------AddNewPassword API--------------------------------------
  addNewPasswordService = async (resetTokenStr, passwordStr) => {
    return await new Promise((resolve, reject) => {
      axios
        .post(stringConstants.baseURL + 'add-password', {
          resetToken: resetTokenStr,
          password: passwordStr,
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  };
}

const api = new API();

export default api;
