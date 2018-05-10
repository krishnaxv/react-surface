import { spring, presets } from 'react-motion'

// Fade In motion
const fadeIn = {
  config: {
    enter: {
      from: {
        opacity: 0
      },
      to: {
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        opacity: 1
      },
      to: {
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
    }
  },
  reducer: value => ({
    opacity: value.opacity
  })
}

// Fade In Scale motion
const fadeInScale = {
  config: {
    enter: {
      from: {
        scale: 0.5,
        opacity: 0.5
      },
      to: {
        scale: spring(1, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        scale: 1,
        opacity: 1
      },
      to: {
        scale: spring(0, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
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
    enter: {
      from: {
        scale: 1.5,
        opacity: 0
      },
      to: {
        scale: spring(1, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        scale: 1,
        opacity: 1
      },
      to: {
        scale: spring(1.5, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
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
    enter: {
      from: {
        translate: 60,
        translateZ: 300,
        rotate: 45,
        opacity: 0
      },
      to: {
        translate: spring(0, { ...presets.gentle, precision: 0.1 }),
        translateZ: spring(0, { ...presets.gentle, precision: 0.1 }),
        rotate: spring(0, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        translate: 0,
        translateZ: 0,
        rotate: 0,
        opacity: 1
      },
      to: {
        translate: spring(60, { ...presets.gentle, precision: 0.1 }),
        translateZ: spring(300, { ...presets.gentle, precision: 0.1 }),
        rotate: spring(45, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
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
    enter: {
      from: {
        translateY: -40,
        opacity: 0
      },
      to: {
        translateY: spring(0, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        translateY: 0,
        opacity: 1
      },
      to: {
        translateY: spring(-40, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
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
    enter: {
      from: {
        translateX: 40,
        opacity: 0
      },
      to: {
        translateX: spring(0, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        translateX: 0,
        opacity: 1
      },
      to: {
        translateX: spring(40, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
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
    enter: {
      from: {
        translateY: 40,
        opacity: 0
      },
      to: {
        translateY: spring(0, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        translateY: 0,
        opacity: 1
      },
      to: {
        translateY: spring(40, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
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
    enter: {
      from: {
        translateX: -40,
        opacity: 0
      },
      to: {
        translateX: spring(0, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        translateX: 0,
        opacity: 1
      },
      to: {
        translateX: spring(-40, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
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
    enter: {
      from: {
        rotate: 180,
        opacity: 0
      },
      to: {
        rotate: spring(0, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(1, { ...presets.gentle, precision: 0.1 })
      }
    },
    exit: {
      from: {
        rotate: 0,
        opacity: 1
      },
      to: {
        rotate: spring(180, { ...presets.gentle, precision: 0.1 }),
        opacity: spring(0, { ...presets.gentle, precision: 0.1 })
      }
    }
  },
  reducer: value => ({
    transform: `rotate(${value.rotate}deg)`,
    opacity: value.opacity
  })
}

const motion = {
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

export { motion }
