import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class InputFields extends Component {
  render() {
    const {inputType, labelText, onChangeText} = this.props;
    return (
      <View style={styles.viewStyle}>
        {/* {inputType === 'password' ? (
          <Image
            source={require('../../assets/passwordKey.png')}
            style={styles.imageStyle}
          />
        ) : null} */}
        <TextInput
          placeholder={labelText}
          labelColor={'#9a73ef'}
          placeholderTextColor="#000"
          style={styles.inputfield}
          autoCorrect={false}
          onChangeText={onChangeText}
          secureTextEntry={inputType === 'password' ? true : false}
          autoCapitalize={'none'}
          underlineColorAndroid="#808080"
        />
      </View>
    );
  }
}

InputFields.propTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  onChangeText: PropTypes.func,
  showCheckMark: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.bool,
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
  inputfield: {
    // marginTop: 5,
    // height: 45,
    padding: 10,
    //marginBottom: 5,
    color: '#000',
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#FFFFFF',
    textDecorationLine: 'underline',
    borderRadius: 8,
    //borderBottomColor: '#808080',
  },
});
