import re

file_path = "c:/Users/ganap/OneDrive/Desktop/website_builder/Website-builder-frontend/frontend/src/app/pages/Builder/Renderer.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Change import
content = re.sub(
    r"import \{ MOTION_PRESETS \} from '\.\/MotionPresets';",
    "import { MOTION_PRESETS, getMotionProps } from './MotionPresets';",
    content
)

# 2. Change signature to include animation
content = re.sub(
    r"const (\w+Section) = \(\{\s*settings,\s*styles\s*=\s*\{\},\s*isMobile\s*\}\) => \{",
    r"const \1 = ({ settings, styles = {}, animation, isMobile }) => {",
    content
)

# 3. Change motionProps derivation
content = re.sub(
    r"const motionProps = MOTION_PRESETS\[styles\.animation\]\s*\|\|\s*MOTION_PRESETS\.none;",
    r"const motionProps = getMotionProps(animation, styles.animation);",
    content
)

# 4. Update the dispatcher to pass section.animation
content = re.sub(
    r"settings=\{section\.settings\}\s*\n\s*styles=\{section\.styles\}\s*\n\s*isMobile=\{isMobile\}",
    r"settings={section.settings}\n              styles={section.styles}\n              animation={section.animation}\n              isMobile={isMobile}",
    content
)

with open(file_path, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)

print("Done with python regex refactor!")
