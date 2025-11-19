import type { Ref } from "vue";
import { ref, computed } from "vue";
import type { ISelectProps, OptionsType } from "./types";

const useSelect = (props: ISelectProps, selectValue: Ref<OptionsType | null>) => {

  const optionsContentRef = ref<HTMLUListElement | null>(null);
  const hoverIndex = ref<number | null>(null)
  const internalLoading = ref(false)
  const loadedOptions = ref<OptionsType[]>([])

  // Computed for final options (either props.options or loaded options)
  const finalOptions = computed(() => {
    if (props.onLoad && loadedOptions.value.length > 0) {
      return loadedOptions.value
    }
    return props.options || []
  })

  // Computed for loading state (either prop or internal loading)
  const isLoadingState = computed(() => props.isLoading || internalLoading.value)

  const isSame = (option: OptionsType) => {
    if (selectValue.value) {
      return option[props.optionLabel!] === selectValue.value![props.optionLabel!]
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

  const optionClickHandler = (option: OptionsType, close: () => void) => {
    if (!props.disabled && !isLoadingState.value) {
      selectValue.value = option
      close()
    }
  }

  const loadAsyncData = async (openPanel: () => void) => {
    if (!props.onLoad || props.disabled) return

    try {
      internalLoading.value = true
      openPanel()

      const fetchedOptions = await props.onLoad()
      loadedOptions.value = fetchedOptions

    } catch (error) {
      console.error('Error loading select options:', error)
      loadedOptions.value = []
    } finally {
      internalLoading.value = false
    }
  }

  const handleKeyDown = (e: KeyboardEvent, close: () => void) => {
      e.preventDefault();
    const currentOptions = finalOptions.value
    if (currentOptions.length === 0 || props.disabled || isLoadingState.value) return;


    if (e.key === "ArrowDown") {
      e.preventDefault();
      hoverIndex.value = (hoverIndex.value! + 1) % currentOptions.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      hoverIndex.value =
        (hoverIndex.value! - 1 + currentOptions.length) % currentOptions.length;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (hoverIndex.value !== null && hoverIndex.value >= 0) {
        selectValue.value = currentOptions[hoverIndex.value];
        close();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return {
    optionsContentRef,
    hoverIndex,
    finalOptions,
    isLoadingState,
    isSame,
    onHover,
    optionClickHandler,
    handleKeyDown,
    loadAsyncData
  }
}

export default useSelect
