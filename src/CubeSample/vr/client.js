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

import {VRInstance} from 'react-vr-web';
import {Module} from 'react-vr-web';
import * as THREE from 'three';

function init(bundle, parent, options) {

  // Create a scene so we can add to it; otherwise the VRInstance creates one.
  const scene = new THREE.Scene();
  // Create Native Module so React context can modify native (Three.js) cube.
  const cubeModule = new CubeModule();

  const vr = new VRInstance(bundle, 'CubeSample', parent, {
    cursorVisibility: 'visible',
    nativeModules: [ cubeModule ],
    scene: scene,
  });

  // Custom scene setup goes here. Add a cube to the scene.
  // Must be done after providing the scene to VRInstance above.
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );
  cube.position.z = -4;
  scene.add(cube);

  // Give cubeModule a handle to our cube.
  cubeModule.init(cube);

  vr.render = function(timestamp) {
    // Custom per-frame updates go here. Bounce the cube up and down.
    const seconds = timestamp / 1000;
    cube.position.x = 0 + (1 * (Math.cos(seconds)));
    cube.position.y = 0.2 + (1 * Math.abs(Math.sin(seconds)));
  };

  // Begin the animation loop
  vr.start();
  return vr;
}

export default class CubeModule extends Module {
  // CubeModule is a React Native Module, which implements functionality
  // that can be called asynchronously across the React Native brige.

  // Constructor calls super() with one argument: module name.
  constructor() {
    super('CubeModule');
  }

  // Called directly after the module is created.
  init(cube) {
    this.cube = cube;
  }

  // Change the cube material color to the given value.
  // Called remotely by the CubeModule on the React side.
  changeCubeColor(color) {
    // THREE.Color() accepts either a six-digit hex color or a CSS style.
    // e.g. 0xff0000, 'rgb(255,0,0)', 'red'
    this.cube.material.color = new THREE.Color(color);
  }

}

window.ReactVR = {init};
