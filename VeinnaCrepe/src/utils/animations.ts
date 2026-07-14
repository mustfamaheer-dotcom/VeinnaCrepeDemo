export const ANIMATION_TIMING = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.6,
  slowest: 0.8,
};

export const ANIMATION_EASING = {
  easeIn: [0.42, 0, 1, 1] as const,
  easeOut: [0, 0, 0.58, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
  sharp: [0.4, 0, 0.2, 1] as const,
};
