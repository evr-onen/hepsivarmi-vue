import type { Ref } from "vue";
import { nextTick, ref, computed, onMounted } from "vue";
import type { IMultiselectProps, OptionsType } from "./multiselect.types";

const useMultiselect = (props: IMultiselectProps, selectValues: Ref<OptionsType[] | undefined>) => {
  const optionsContentRef = ref<HTMLUListElement | null>(null);
  const badgeContainerRef = ref<HTMLDivElement | null>(null);
  const hoverIndex = ref<number | null>(null)
  const internalLoading = ref(false)
  const loadedOptions = ref<OptionsType[]>([])
  const showNumeric = ref(false)
  const maxVisibleBadges = ref(3) // default fallback

  // Computed for final options (either props.options or loaded options)
  const finalOptions = computed(() => {
    if (props.onLoad && loadedOptions.value.length > 0) {
      return loadedOptions.value
    }
    return props.options || []
  })

  // Computed for loading state (either prop or internal loading)
  const isLoadingState = computed(() => props.isLoading || internalLoading.value)

  // Check if badges overflow and determine how many can fit
  const checkOverflow = () => {
    if (!badgeContainerRef.value || !selectValues.value || selectValues.value.length <= 1) {
      showNumeric.value = false
      return
    }

    const container = badgeContainerRef.value
    const containerWidth = container.offsetWidth - 60 // Reserve space for chevron and clear button

    // Create temporary badges to measure their width
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.visibility = 'hidden'
    tempContainer.style.display = 'flex'
    tempContainer.style.gap = '4px'
    tempContainer.className = container.className

    document.body.appendChild(tempContainer)

    let totalWidth = 0
    let visibleCount = 0

    for (let i = 0; i < selectValues.value.length; i++) {
      const tempBadge = document.createElement('div')
      tempBadge.textContent = selectValues.value[i][props.optionLabel!] as string
      tempBadge.className = 'px-2 py-1 rounded text-sm' // Badge approximate classes
      tempBadge.style.whiteSpace = 'nowrap'

      tempContainer.appendChild(tempBadge)

      const badgeWidth = tempBadge.offsetWidth + 4 // Include gap

      if (totalWidth + badgeWidth <= containerWidth) {
        totalWidth += badgeWidth
        visibleCount++
      } else {
        break
      }
    }

    document.body.removeChild(tempContainer)

    if (visibleCount < selectValues.value.length) {
      showNumeric.value = true
      maxVisibleBadges.value = Math.max(1, visibleCount - 1) // Reserve space for numeric indicator
    } else {
      showNumeric.value = false
      maxVisibleBadges.value = selectValues.value.length
    }
  }

  const isSame = (option: OptionsType) => {
    if (selectValues.value) {
      const optionIndex = selectValues.value?.findIndex(optionItem=> optionItem[props.optionLabel!] === option[props.optionLabel!])
      return (optionIndex !== -1 )
    }
    return false
  }

  const onHover = (e:EventTarget | null  ,index: number) =>{
    const target = e as HTMLElement;
    if(target){
      target.focus()
    }
    hoverIndex.value = index
  }

  const optionClickHandler = (option: OptionsType) => {
    if (props.disabled || isLoadingState.value) return

    if (!selectValues.value) {
      selectValues.value = []
    }

    const optionIndex = selectValues.value?.findIndex(optionItem=> optionItem[props.optionLabel!] === option[props.optionLabel!])

    if(optionIndex === -1){
      // Add selection to the beginning (most recent first)
      if (props.multiselect) {
        selectValues.value!.unshift(option)
      } else {
        // For single select, replace selection
        selectValues.value = [option]
      }
    } else {
      // Remove selection
      selectValues.value?.splice(optionIndex as number, 1)
    }

    // Check overflow after selection change
    nextTick(() => {
      checkOverflow()
    })
  }

  // Async data loading function
  const loadAsyncData = async (openPanel: () => void) => {
    if (!props.onLoad || props.disabled) return

    try {
      internalLoading.value = true

      // Open panel to show loading state
      openPanel()

      // Fetch data
      const fetchedOptions = await props.onLoad()
      loadedOptions.value = fetchedOptions

    } catch (error) {
      console.error('Error loading multiselect options:', error)
      loadedOptions.value = []
    } finally {
      internalLoading.value = false
    }
  }

  const togglePanelKeypressHandler = async(e:KeyboardEvent, openPanel:()=>void)=>{
    if(e.key === " "){
      e.preventDefault()

      // If onLoad is defined and no options loaded yet, load async data
      if (props.onLoad && finalOptions.value.length === 0) {
        await loadAsyncData(openPanel)
      } else {
        openPanel()
      }

      await nextTick()
      if(optionsContentRef.value){
        (optionsContentRef.value?.children[0] as HTMLElement).focus()
        hoverIndex.value = 0
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent, close: () => void) => {
      e.preventDefault()
    const currentOptions = finalOptions.value
    if (currentOptions.length === 0 || props.disabled || isLoadingState.value) return

    e.preventDefault()
    if (e.key === "ArrowDown") {

      hoverIndex.value = (hoverIndex.value! + 1) % currentOptions.length
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      hoverIndex.value =
        (hoverIndex.value! - 1 + currentOptions.length) % currentOptions.length
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (hoverIndex.value !== null && hoverIndex.value >= 0) {
        const selectedOption = currentOptions[hoverIndex.value]
        optionClickHandler(selectedOption)
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }

  // Watch for container resize and selection changes
  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkOverflow)
    }
  })

  return {
    hoverIndex,
    finalOptions,
    isLoadingState,
    showNumeric,
    maxVisibleBadges,
    badgeContainerRef,
    isSame,
    onHover,
    optionClickHandler,
    togglePanelKeypressHandler,
    handleKeyDown,
    optionsContentRef,
    loadAsyncData,
    checkOverflow
  }
}

export default useMultiselect
