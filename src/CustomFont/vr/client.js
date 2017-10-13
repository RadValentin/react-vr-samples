import {VRInstance} from 'react-vr-web';
import * as OVRUI from 'ovrui';

function init(bundle, parent, options) {
  OVRUI.loadFont(
    '../static_assets/Lobster.fnt',
    '../static_assets/Lobster_sdf.png'
  ).then(font => {
    const vr = new VRInstance(bundle, 'CustomFont', parent, {
      font: font,
      ...options
    });
    vr.render = function() {};
    vr.start();
  });
}

window.ReactVR = {init};
