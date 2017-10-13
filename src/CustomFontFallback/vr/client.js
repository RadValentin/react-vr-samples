import {VRInstance} from 'react-vr-web';
import * as OVRUI from 'ovrui';

function init(bundle, parent, options) {
  Promise.all([
    OVRUI.loadFont(
      '../static_assets/Lobster.fnt',
      '../static_assets/Lobster_sdf.png'
    ),
    OVRUI.loadFont(
      '../static_assets/FontAwesome.fnt',
      '../static_assets/FontAwesome_sdf.png'
    )
  ]).then(([lobsterFont, fontAwesome]) => {
    // If a glyph isn't in Lobster then we fallback to FontAwesome
    OVRUI.addFontFallback(lobsterFont, fontAwesome);

    const vr = new VRInstance(bundle, 'CustomFontFallback', parent, {
      font: lobsterFont,
      ...options
    });
    vr.render = function() {};
    vr.start();
  });
}

window.ReactVR = {init};
