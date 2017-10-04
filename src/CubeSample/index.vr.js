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
 *
 * CubeSample displays a ReactVR button and text, along with a Three.js cube.
 * The cube will change color when the button is selected. The React context
 * and Three.js scene are in separate threads, so they communicate over the
 * React Native bridge via the CubeModule, a custom Native Module. This
 * shows how ReactVR UI elements can be added to an existing Three.js scene.
 */

import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  NativeModules,
} from 'react-vr';

// Native Module defined in vr/client.js
const CubeModule = NativeModules.CubeModule;

/**
 * CubeSample implements a custom button that calls a native module method,
 * changing the color of a cube that is managed on the native (Three.js) side.
 */
class CubeSample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {btnColor: 'white', cubeColor: 'yellow'};
    CubeModule.changeCubeColor(this.state.cubeColor);
  }

  render() {
    return (
      <View
        style={{
          transform:[{translate: [0, 0, -3]}],
          layoutOrigin: [0.5, 0, 0],
          alignItems: 'center',
        }}>
        <Pano source={asset('chess-world.jpg')}/>
        <VrButton
          style={{
            backgroundColor: this.state.btnColor,
            borderRadius: 0.05,
            margin: 0.05,
          }}
          onEnter={()=>{this.setState({btnColor: this.state.cubeColor})}}
          onExit={()=>{this.setState({btnColor: 'white'})}}
          onClick={()=>{
            let hexColor = Math.floor(Math.random()*0xffffff).toString(16);
            // Ensure we always have 6 digits by padding with leading zeros.
            hexColor = '#'+(('000000'+hexColor).slice(-6));
            this.setState({cubeColor: hexColor, btnColor: hexColor});
            // Asynchronous call to custom native module; sends the new color.
            CubeModule.changeCubeColor(hexColor);
          }}
          onClickSound={asset('freesound__146721__fins__menu-click.wav')}
          onEnterSound={asset('freesound__278205__ianstargem__switch-flip-1.wav')}
        >
          <Text style={{
            fontSize: 0.15,
            paddingTop: 0.025,
            paddingBottom: 0.025,
            paddingLeft: 0.05,
            paddingRight: 0.05,
            textAlign:'center',
            textAlignVertical:'center',
          }}>
            button
          </Text>
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('CubeSample', () => CubeSample);


