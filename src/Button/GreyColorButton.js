import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export default class GreyColorButton extends Component {
  render() {
    const {text, textColor, handleOnPress} = this.props;
    const color = textColor || '#000';
    return (
      <TouchableHighlight onPress={handleOnPress}>
        <View>
          <Text style={[{color}, styles.buttonText, styles.wrapper]}>
            {text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

GreyColorButton.PropTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 90,
    marginRight: 90,
    marginTop: 25,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#808080',
  },
});
