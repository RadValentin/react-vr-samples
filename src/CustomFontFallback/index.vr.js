/**
 * The CustomFontFallback sample shows how to combine a decorative font like 
 * Lobster with an icon font like FontAwesome. This works because each font was 
 * generated for a specific unicode range so when we can't find a glyph in 
 * Lobster we fall fack to FontAwesome. Relevant code is in `vr/client.js`.
 */
import React from 'react';
import {asset, AppRegistry, Pano, StyleSheet, Text, View} from 'react-vr';

const styles = StyleSheet.create({
  awesome: {
    color: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 0.8,
    textAlign: 'center'
  }
});

class CustomFontFallback extends React.Component {
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
              backgroundColor: '#1fa67a',
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              transform: [{translate: [0, 0, -3]}]
            }}>
            <Text style={styles.awesome}>
              Text and icons, pretty dope
            </Text>
            <Text style={styles.awesome}>
              &#xf004; &#xf005; &#xf164; 
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('CustomFontFallback', () => CustomFontFallback);
