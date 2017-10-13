/**
 * The CustomFont sample shows how to load a user defined font, Lobster so that 
 * all <Text> components use it instead of the default OculusSans that React VR 
 * comes with. Relevant code is in `vr/client.js`.
 */
import React from 'react';
import {asset, AppRegistry, Pano, StyleSheet, Text, View} from 'react-vr';

const styles = StyleSheet.create({
  lobster: {
    color: '#ffffff',
    fontSize: 0.8,
    textAlign: 'center'
  }
});

class CustomFont extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <View
          style={{
            transform: [{translate: [0, 0, -2]}]
          }}>
          <View
            style={{
              backgroundColor: '#c52a21',
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              transform: [{translate: [0, 0, -3]}]
            }}>
            <Text style={styles.lobster}>Need a font?</Text>
            <Text style={styles.lobster}>Why not Lobster?</Text>
          </View>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('CustomFont', () => CustomFont);
