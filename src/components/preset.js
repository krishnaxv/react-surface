// Fade In motion
const fadeIn = {
  config: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  reducer: value => ({
    opacity: value.opacity
  })
}

// Fade In Scale motion
const fadeInScale = {
  config: {
    from: {
      scale: 0.5,
      opacity: 0.5
    },
    to: {
      scale: 1,
      opacity: 1
    }
  },
  reducer: value => ({
    transform: `scale(${value.scale})`,
    opacity: value.opacity
  })
}

// Fall motion
const fall = {
  config: {
    from: {
      scale: 1.5,
      opacity: 0
    },
    to: {
      scale: 1,
      opacity: 1
    }
  },
  reducer: value => ({
    transform: `scale(${value.scale})`,
    opacity: value.opacity
  })
}

// Side Fall motion
const sideFall = {
  config: {
    from: {
      translate: 60,
      translateZ: 300,
      rotate: 45,
      opacity: 0
    },
    to: {
      translate: 0,
      translateZ: 0,
      rotate: 0,
      opacity: 1
    }
  },
  reducer: value => ({
    transformStyle: 'preserve-3d',
    transform: `translate(${value.translate}%) translateZ(${
      value.translateZ
    }px) rotate(${value.rotate}deg)`,
    opacity: value.opacity
  })
}

// Slide In Top motion
const slideInTop = {
  config: {
    from: {
      translateY: -40,
      opacity: 0
    },
    to: {
      translateY: 0,
      opacity: 1
    }
  },
  reducer: value => ({
    transform: `translateY(${value.translateY}px)`,
    opacity: value.opacity
  })
}

// Slide in Right motion
const slideInRight = {
  config: {
    from: {
      translateX: 40,
      opacity: 0
    },
    to: {
      translateX: 0,
      opacity: 1
    }
  },
  reducer: value => ({
    transform: `translateX(${value.translateX}px)`,
    opacity: value.opacity
  })
}

// Slide In Bottom motion
const slideInBottom = {
  config: {
    from: {
      translateY: 40,
      opacity: 0
    },
    to: {
      translateY: 0,
      opacity: 1
    }
  },
  reducer: value => ({
    transform: `translateY(${value.translateY}px)`,
    opacity: value.opacity
  })
}

// Slide In Left motion
const slideInLeft = {
  config: {
    from: {
      translateX: -40,
      opacity: 0
    },
    to: {
      translateX: 0,
      opacity: 1
    }
  },
  reducer: value => ({
    transform: `translateX(${value.translateX}px)`,
    opacity: value.opacity
  })
}

// Rotate In motion
const rotateIn = {
  config: {
    from: {
      rotate: 180,
      opacity: 0
    },
    to: {
      rotate: 0,
      opacity: 1
    }
  },
  reducer: value => ({
    transform: `rotate(${value.rotate}deg)`,
    opacity: value.opacity
  })
}

const preset = {
  fadeIn,
  fadeInScale,
  fall,
  sideFall,
  slideInTop,
  slideInRight,
  slideInBottom,
  slideInLeft,
  rotateIn
}

export { preset }
