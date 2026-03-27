const fs = require('fs');
const file = 'c:/Users/ganap/OneDrive/Desktop/website_builder/Website-builder-frontend/frontend/src/app/pages/Builder/Renderer.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Change import
content = content.replace(
  /import \{ MOTION_PRESETS \} from '\.\/MotionPresets';/,
  "import { MOTION_PRESETS, getMotionProps } from './MotionPresets';"
);

// 2. Change signature to include animation
content = content.replace(
  /const (\w+) = \({ settings, styles = \{\}, isMobile }\) => \{/g,
  "const $1 = ({ settings, styles = {}, animation, isMobile }) => {"
);

// 3. Change motionProps derivation
content = content.replace(
  /const motionProps = MOTION_PRESETS\[styles\.animation\] || MOTION_PRESETS\.none;/g,
  "const motionProps = getMotionProps(animation, styles.animation);"
);

// 4. Update the dispatcher to pass section.animation
content = content.replace(
  /settings=\{section\.settings\}\s+styles=\{section\.styles\}\s+\/>/g,
  "settings={section.settings}\n              styles={section.styles}\n              animation={section.animation}\n            />"
);

fs.writeFileSync(file, content);
console.log("Done");
