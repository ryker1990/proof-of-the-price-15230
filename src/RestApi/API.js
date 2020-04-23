import axios from 'axios';

//String Constants
import stringConstants from '../Utils/Constants/StringConstants';

class API {
  //----------------------------------------------------SignUp API--------------------------------------
  signUpService = async(emailStr, passwordStr, zipCodeStr)  => {
    return new Promise((resolve, reject) => {
      await axios
        .post(stringConstants.baseURL + 'signup', {
          userType: 'user',
          email: emailStr,
          password: passwordStr,
          zipcode: zipCodeStr,
        })
        .then(function(response) {
          // alert('response');
          // console.log(response.data);
          resolve(response.body);
        })
        .catch(function(error) {
          // alert('error' + error);
          reject(error);
        });
    });
  }
}

const api = new API();

export default api;
