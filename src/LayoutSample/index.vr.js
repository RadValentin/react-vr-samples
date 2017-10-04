/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

/**
 * LayoutSample displays a list of buttons arranged vertically based on the flexbox
 * layout algorithm that is built into a React <View>. Layout automatically applies to all
 * view children, automatically computing their placement.
 */

import React from 'react';
import {
  asset,
  AppRegistry,
  Pano,
  Text,
  View,
} from 'react-vr';

/**
 * HighlightView implements a custom "button" behaviour by changing the background color
 * of a nested view in response to onEnter/onExit events. These events are fired whenever
 * mouse cursor of VR gaze enters the view.
 * HighlightView makes use of two properties:
 * text            - used to specify the string to display
 * backgroundColor - color to use for background when not highlighted
 */

class HighlightView extends React.Component {
  constructor() {
    super();
    this.state = {
      gazeEnabled: false
    };
  }
  render() {
    return (
      <View style={{
          margin: 0.1,
          height: 0.3,
          backgroundColor: (this.state.gazeEnabled ? 'red' : this.props.backgroundColor),
          borderWidth: 0.01,
          borderColor: (this.state.gazeEnabled ? 'purple' : this.props.backgroundColor),
        }}
        onEnter={() => this.setState({gazeEnabled:true})}
        onExit={() => this.setState({gazeEnabled:false})}
        // onInput captures all inputs from keyboard, mouse, and gamepad.
        // We log it here to demonstrate the events it captures.
        onInput={(e) => console.log(e.nativeEvent)}
        >
        <Text style={{flex: 1, fontSize: 0.2, textAlign: 'center'}}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}


/**
 * LayoutSample is the main component of the scene, displaying a list of buttons
 * on top of a panorama.
 */

class LayoutSample extends React.Component {
  render() {
    // <View> below creates a view that is 2 meters wide and is positioned 5 meters in front
    // of the user (z = -5). Its child items are laid out in a 'column' and marked to 'stretch'
    // to the width of the view container. This causes call child view to have the same width.
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          width: 2,
          alignItems: 'stretch',
          transform: [{translate: [-1, 1, -5]}],
        }}>
          <HighlightView text='Red' backgroundColor='red'/>
          <HighlightView text='Orange' backgroundColor='orange'/>
          <HighlightView text='Yellow' backgroundColor='yellow'/>
          <HighlightView text='Green' backgroundColor='green'/>
          <HighlightView text='Blue' backgroundColor='blue'/>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('LayoutSample', () => LayoutSample);
