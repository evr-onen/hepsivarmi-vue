import type { DirectiveBinding } from "vue";

export interface RevealHtmlElement extends HTMLElement {
  revealObserver?: IntersectionObserver
}

export interface ScrollRevealOptions {
  animation?: string
  duration?: 'fast' | 'normal' | 'slow'
  delay?: number
  threshold?: number
  rootMargin?: string
  once?: boolean
  callback?: (element: HTMLElement) => void
}

const vScrollOnReveal = {
  beforeMount(el: RevealHtmlElement, binding: DirectiveBinding) {
    // console.log('ScrollOnReveal directive mounted', el, binding.value)

    // Parse options - can be string or object
    let options: ScrollRevealOptions = {}

    if (typeof binding.value === 'string') {
      // Simple string animation: v-scroll-on-reveal="'fade-in'"
      options.animation = binding.value
    } else if (typeof binding.value === 'object' && binding.value !== null) {
      // Object with options: v-scroll-on-reveal="{ animation: 'slide-up', duration: 'slow' }"
      options = { ...binding.value }
    }

    // Default options
    const defaultOptions = {
      animation: 'fade-in',
      duration: 'normal',
      delay: 0,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      once: true,
      ...options
    }

    // Add animation class
    const animationClass = `reveal-${defaultOptions.animation}`
    el.classList.add(animationClass)

    // Add duration class if specified
    if (defaultOptions.duration !== 'normal') {
      el.classList.add(`reveal-${defaultOptions.duration}`)
    }

    // Add delay class if specified
    if (defaultOptions.delay > 0) {
      const delayClass = `reveal-delay-${defaultOptions.delay * 100}`
      el.classList.add(delayClass)
    }

    // Create intersection observer
    el.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log('IntersectionObserver triggered', entry.isIntersecting, entry.target)
        if (entry.isIntersecting) {
          // Add revealed class
          entry.target.classList.add('revealed')
          console.log('Added revealed class to', entry.target)

          // Execute callback if provided
          if (defaultOptions.callback) {
            defaultOptions.callback(entry.target as HTMLElement)
          }

          // If one-time reveal, disconnect observer
          if (defaultOptions.once) {
            el.revealObserver?.unobserve(entry.target)
          }
        } else if (!defaultOptions.once) {
          // Remove revealed class if not one-time
          entry.target.classList.remove('revealed')
        }
      })
    }, {
      threshold: defaultOptions.threshold,
      rootMargin: defaultOptions.rootMargin
    })

    // Start observing
    el.revealObserver.observe(el)
  },

  unmounted(el: RevealHtmlElement) {
    if (el.revealObserver) {
      el.revealObserver.disconnect()
    }
  }
}

export default vScrollOnReveal
