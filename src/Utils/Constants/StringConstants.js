const stringConstants = {
  emailRegEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  invalidEmail: 'Email Address is invalid',
  invalidPassword: 'Password is too short minimum 6 character is required',
  invalidConfirmPassword: 'Confirm Password does not match',
  invalidZipCode: 'Zip Code is invalid',
  invalidOtp: 'Invalid OTP',
  baseURL: 'http://ec2-3-22-171-171.us-east-2.compute.amazonaws.com/api/',
};

export default stringConstants;
