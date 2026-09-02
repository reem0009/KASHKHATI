import { animate, createTimeline, stagger, utils } from 'animejs';

/**
 * KASHKHATI Anime.js Integration
 * Anime.js v4 API utilities for luxury animations
 */

// Luxury easing functions matching brand feel
export const LUXURY_EASING = {
  smooth: 'out(3)',
  elegant: 'inOut(4)',
  swift: 'out(2)',
  bounce: 'spring(1, 80, 10, 0)',
} as const;

// Stagger timing for sequential animations
export const STAGGER = {
  fast: 50,
  medium: 100,
  slow: 150,
  elegant: 200,
} as const;

/**
 * Fade in animation with slide up
 */
export const fadeInUp = (targets: any, delay = 0) => {
  return animate(targets, {
    opacity: [0, 1],
    translateY: [30, 0],
    ease: LUXURY_EASING.elegant,
    duration: 800,
    delay,
  });
};

/**
 * Fade in with stagger for lists
 */
export const fadeInStagger = (targets: any) => {
  return animate(targets, {
    opacity: [0, 1],
    translateY: [20, 0],
    ease: LUXURY_EASING.smooth,
    duration: 600,
    delay: stagger(STAGGER.medium),
  });
};

/**
 * Scale in animation for cards
 */
export const scaleIn = (targets: any, delay = 0) => {
  return animate(targets, {
    opacity: [0, 1],
    scale: [0.95, 1],
    ease: LUXURY_EASING.elegant,
    duration: 700,
    delay,
  });
};

/**
 * Slide in from left
 */
export const slideInLeft = (targets: any, delay = 0) => {
  return animate(targets, {
    opacity: [0, 1],
    translateX: [-50, 0],
    ease: LUXURY_EASING.elegant,
    duration: 800,
    delay,
  });
};

/**
 * Slide in from right
 */
export const slideInRight = (targets: any, delay = 0) => {
  return animate(targets, {
    opacity: [0, 1],
    translateX: [50, 0],
    ease: LUXURY_EASING.elegant,
    duration: 800,
    delay,
  });
};

/**
 * Pearl bow shimmer animation
 */
export const pearlShimmer = (targets: any) => {
  return animate(targets, {
    opacity: [0.6, 1, 0.6],
    scale: [1, 1.05, 1],
    ease: LUXURY_EASING.smooth,
    duration: 3000,
    loop: true,
  });
};

/**
 * Progress bar fill animation
 */
export const progressFill = (targets: any, percentage: number) => {
  return animate(targets, {
    width: `${percentage}%`,
    ease: LUXURY_EASING.elegant,
    duration: 1000,
  });
};

/**
 * Rotate wax seal on hover
 */
export const rotateSeal = (targets: any) => {
  return animate(targets, {
    rotate: [0, 360],
    ease: LUXURY_EASING.swift,
    duration: 600,
  });
};

/**
 * Number counter animation
 */
export const countUp = (
  targets: string | HTMLElement,
  from: number,
  to: number,
  duration = 1500
) => {
  const obj = { value: from };
  
  return animate(obj, {
    value: to,
    round: 1,
    ease: LUXURY_EASING.smooth,
    duration,
    onUpdate: () => {
      const element = typeof targets === 'string' ? document.querySelector(targets) : targets;
      if (element) {
        element.textContent = Math.round(obj.value).toString();
      }
    },
  });
};

/**
 * Reveal text character by character
 */
export const revealText = (targets: string | HTMLElement) => {
  const element = typeof targets === 'string' ? document.querySelector(targets) : targets;
  if (!element || !(element instanceof HTMLElement)) return;

  const text = element.textContent || '';
  element.innerHTML = text
    .split('')
    .map((char) => `<span style="opacity:0">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  return animate(`${typeof targets === 'string' ? targets : ''} span`, {
    opacity: [0, 1],
    ease: LUXURY_EASING.smooth,
    duration: 50,
    delay: stagger(30),
  });
};

/**
 * Hover lift effect
 */
export const hoverLift = (element: HTMLElement) => {
  const tl = createTimeline({
    autoplay: false,
  });

  tl.add(element, {
    translateY: -8,
    scale: 1.02,
    ease: LUXURY_EASING.swift,
    duration: 300,
  });

  element.addEventListener('mouseenter', () => tl.play());
  element.addEventListener('mouseleave', () => tl.reverse());

  return tl;
};

/**
 * Timeline sequence for complex animations
 */
export const luxuryTimeline = (autoplay = true) => {
  return createTimeline({
    autoplay,
  });
};

/**
 * Infinite shimmer effect for luxury elements
 */
export const luxuryShimmer = (targets: any) => {
  return animate(targets, {
    opacity: [0.8, 1, 0.8],
    ease: 'inOut(2)',
    duration: 2000,
    loop: true,
    alternate: true,
  });
};

// Export main functions
export { animate, createTimeline, stagger, utils };
