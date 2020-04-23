import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

//Color class
import colorConstants from '../Utils/Constants/ColorConstants';

export default class BlackColorButton extends Component {
  render() {
    const {text, textColor, handleOnPress} = this.props;
    const color = textColor || colorConstants.black;
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

BlackColorButton.PropTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 80,
    marginRight: 80,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
