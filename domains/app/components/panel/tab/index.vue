<script setup lang="ts">
interface IPropsType{
  titles            ?: string[],
  defaultTab        ?: number
}

const props = withDefaults(defineProps<IPropsType>(), {
  titles            : ()=>['Tab 1', 'tab 2'],
  defaultTab        : 0
})

const slots = useSlots()
// const turnToSlug = (name: string) => {
//   return name.toLowerCase().replace(/ /g, '-')
// }
const currentTab = ref<number>(props.defaultTab)
const tabButtonsRef = ref(null)
const indicatorRef = ref(null)
const indicatorLeft = ref<number>(0)
const indicatorCurrentLeft = ref<number>(5)
const indicatorWidth = ref<number>(0)
const changeTab = (index: number) => {
  currentTab.value = index
}

const preparedTab = () => {
  if(tabButtonsRef.value){
    const parentLeft = tabButtonsRef.value.getBoundingClientRect().left
    const currentIndicator = tabButtonsRef.value.querySelector('.currentTab')
    indicatorLeft.value = currentIndicator.getBoundingClientRect().left-1
    indicatorWidth.value = currentIndicator.getBoundingClientRect().width
    indicatorCurrentLeft.value = indicatorLeft.value - parentLeft
  }
}

onMounted(() => {
  preparedTab()
})

watch([currentTab, tabButtonsRef], async()=>{
 await nextTick()
  if(tabButtonsRef.value){
    preparedTab()
  }
  if(indicatorRef.value){
    indicatorRef.value.style.transition = '300ms ease-out';
  }
},{immediate:true})
</script>

<template>
  <div class="tab">
    <div ref="tabButtonsRef" class="tab-buttons" >
      <div
          ref="indicatorRef"
          class="indicator"
          :style="{'left':indicatorCurrentLeft+'px', width: indicatorWidth+'px'}"
      />
      <div
          v-for="(title,index) in titles"
          :key="index" class="tab-buttons-item"

          :class="{currentTab:index === currentTab }"
          @click="changeTab(index)"
      >
        {{title}}
      </div>
    </div>
    <div class="tab-contents">
      <div v-for="(slotName, index) in Object.keys($slots)" :key="slotName" >
        <div v-if="index === currentTab" class="tab-contents-item">
          <slot :name="slotName"/>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.tab{
  display: flex;
  flex-direction: column;
  width: 100%;



  .tab-buttons{
    position: relative;
    margin: 0 0 5px 0;
    width: fit-content;
    display: flex;
    align-items: center;
    flex: 1;
    padding: 8px;
    background-color: #F8F9FA;
    border-radius: 10px;
    border: 0.5px solid #f1e8e8;

    .indicator{
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      position: absolute;
      height: calc(100% - 10px);
      z-index: 0;
      background-color: #fff;
      border-radius: 8px;
    }

    .tab-buttons-item{
      position: relative;
      z-index: 10;
      color: #344767FF;
      padding-inline: 1rem;
      font-size: 16px;
      font-weight: 400;
      background-color: transparent;
      cursor: pointer;
      border-radius: 8px;

    }


  }

  .tab-contents{

    .tab-contents-item{
      background-color: #eaf8fa;
      padding: 10px;
      border-radius: 0 10px 10px 10px  ;
    }
  }
}
</style>