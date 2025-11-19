import type { DirectiveBinding } from 'vue'

type ClickOutsideBinding = {
    handler: (event: Event) => void
    exclude?: HTMLElement[]
}

function handler(event: Event, el: HTMLElement, binding: DirectiveBinding<ClickOutsideBinding>) {
    const { handler, exclude = [] } = binding.value || {}

    const clickedInsideEl = el.contains(event.target as Node)
    const clickedOnExcluded = exclude.some(ref => ref?.contains(event.target as Node))
    if (!clickedInsideEl && !clickedOnExcluded) {
        handler(event)
    }
}

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding<ClickOutsideBinding>) {
        el.__clickOutsideHandler__ = (event: Event) => handler(event, el, binding)
        document.addEventListener('click', el.__clickOutsideHandler__)
    },
    unmounted(el: HTMLElement) {
        document.removeEventListener('click', el.__clickOutsideHandler__)
        delete el.__clickOutsideHandler__
    }
}
