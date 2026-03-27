/**
 * ENTRANCE ANIMATION PRESETS
 * Definitions for Framer Motion 'initial', 'whileInView', and 'transition' 
 */

export const MOTION_PRESETS = {
  none: {
    initial: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, rotateX: 0, rotateY: 0 },
    whileInView: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, rotateX: 0, rotateY: 0 },
    transition: { duration: 0 }
  },
  
  // FADE
  'fade-in': { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.8 } },
  'fade-up': { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: 'easeOut' } },
  'fade-down': { initial: { opacity: 0, y: -40 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: 'easeOut' } },
  'fade-left': { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.8, ease: 'easeOut' } },
  'fade-right': { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.8, ease: 'easeOut' } },

  // SLIDE
  'slide-left': { initial: { opacity: 0, x: -100 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } },
  'slide-right': { initial: { opacity: 0, x: 100 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } },
  'slide-up': { initial: { opacity: 0, y: 100 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } },
  'slide-down': { initial: { opacity: 0, y: -100 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } },

  // ZOOM / SCALE
  'zoom-in': { initial: { opacity: 0, scale: 0.5 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 0.6, type: 'spring', damping: 15 } },
  'zoom-out': { initial: { opacity: 0, scale: 1.5 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 0.6, type: 'spring', damping: 15 } },
  'scale-up': { initial: { scale: 0.8 }, whileInView: { scale: 1 }, transition: { duration: 0.5, ease: 'easeOut' } },
  'scale-down': { initial: { scale: 1.2 }, whileInView: { scale: 1 }, transition: { duration: 0.5, ease: 'easeOut' } },

  // ROTATE
  'rotate-in': { initial: { opacity: 0, rotate: -180, scale: 0.5 }, whileInView: { opacity: 1, rotate: 0, scale: 1 }, transition: { duration: 0.8, type: 'spring' } },
  'rotate-left': { initial: { opacity: 0, rotate: -90 }, whileInView: { opacity: 1, rotate: 0 }, transition: { duration: 0.7, ease: 'easeOut' } },
  'rotate-right': { initial: { opacity: 0, rotate: 90 }, whileInView: { opacity: 1, rotate: 0 }, transition: { duration: 0.7, ease: 'easeOut' } },
  'flip-x': { initial: { opacity: 0, rotateX: 90 }, whileInView: { opacity: 1, rotateX: 0 }, transition: { duration: 0.8, type: 'spring', damping: 10 } },
  'flip-y': { initial: { opacity: 0, rotateY: 90 }, whileInView: { opacity: 1, rotateY: 0 }, transition: { duration: 0.8, type: 'spring', damping: 10 } },

  // BOUNCE
  'bounce-up': { initial: { opacity: 0, y: 100 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8, type: 'spring', bounce: 0.6 } },
  'bounce-down': { initial: { opacity: 0, y: -100 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8, type: 'spring', bounce: 0.6 } },

  // ADVANCED
  'reveal-stagger': { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, staggerChildren: 0.2 } },
  'elastic-in': { initial: { opacity: 0, scale: 0.3 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 1.2, type: 'spring', bounce: 0.75, damping: 8 } }
};

export const ANIMATION_CATEGORIES = [
  {
    category: "Fade",
    animations: [
      { id: "fade-in", label: "Fade In" },
      { id: "fade-up", label: "Fade Up" },
      { id: "fade-down", label: "Fade Down" },
      { id: "fade-left", label: "Fade Left" },
      { id: "fade-right", label: "Fade Right" }
    ]
  },
  {
    category: "Slide",
    animations: [
      { id: "slide-left", label: "Slide Left" },
      { id: "slide-right", label: "Slide Right" },
      { id: "slide-up", label: "Slide Up" },
      { id: "slide-down", label: "Slide Down" }
    ]
  },
  {
    category: "Zoom / Scale",
    animations: [
      { id: "zoom-in", label: "Zoom In" },
      { id: "zoom-out", label: "Zoom Out" },
      { id: "scale-up", label: "Scale Up" },
      { id: "scale-down", label: "Scale Down" }
    ]
  },
  {
    category: "Rotate",
    animations: [
      { id: "rotate-in", label: "Rotate In" },
      { id: "rotate-left", label: "Rotate Left" },
      { id: "rotate-right", label: "Rotate Right" },
      { id: "flip-x", label: "Flip X" },
      { id: "flip-y", label: "Flip Y" }
    ]
  },
  {
    category: "Bounce",
    animations: [
      { id: "bounce-up", label: "Bounce Up" },
      { id: "bounce-down", label: "Bounce Down" }
    ]
  },
  {
    category: "Advanced",
    animations: [
      { id: "reveal-stagger", label: "Reveal Stagger" },
      { id: "elastic-in", label: "Elastic In" }
    ]
  }
];

export const getMotionProps = (animationObj, legacyStyleString) => {
  // 1. Resolve preset configuration
  let presetKey = 'none';
  if (animationObj && typeof animationObj.type === 'string') {
    presetKey = animationObj.type;
  } else if (typeof legacyStyleString === 'string' && MOTION_PRESETS[legacyStyleString]) {
    presetKey = legacyStyleString;
  }

  const preset = MOTION_PRESETS[presetKey] || MOTION_PRESETS['none'];
  
  // 2. Clone it so we don't mutate the raw preset
  const finalProps = {
    initial: { ...preset.initial },
    whileInView: { ...preset.whileInView },
    transition: { ...preset.transition }
  };

  // 3. Apply custom duration & delay from animationObj if present
  if (animationObj) {
    if (animationObj.duration !== undefined) {
      finalProps.transition.duration = parseFloat(animationObj.duration) || preset.transition.duration;
    }
    if (animationObj.delay !== undefined) {
      finalProps.transition.delay = parseFloat(animationObj.delay) || 0;
    }
  }

  // Common: viewport once true keeps it lightweight
  finalProps.viewport = { once: true, margin: "-50px" };

  return finalProps;
};

// Legacy flat list for InspectorSidebar dropdown
export const MOTION_OPTIONS = [
  { label: 'None', value: 'none' },
  ...ANIMATION_CATEGORIES.flatMap(cat =>
    cat.animations.map(a => ({ label: a.label, value: a.id }))
  )
];
