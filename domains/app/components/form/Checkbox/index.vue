<script setup lang="ts">

defineOptions({
  name: "CheckboxInput",
})
interface ICheckboxProps{
  label ?: string,
}
const props = withDefaults(defineProps<ICheckboxProps>(),{
  label: ''
})

const modelValue = defineModel<boolean>()

const clickHandler = () =>{
  modelValue.value = !modelValue.value
}


</script>

<template>
<div class="checkbox" @click="clickHandler">
  <input type="checkbox" :checked="modelValue" />
  <div class="label">{{label}}</div>
</div>
</template>

<style scoped>
.checkbox{
  display: inline-flex;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  align-items: center;

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
  }

  input[type="checkbox"]:hover {
    border-color: #999;
  }

  input[type="checkbox"]:checked {
    background-color: #2563eb;
    border-color: #2563eb;
  }

  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto auto 4px auto;
    width: 6px;
    height: 10px;
    border-right: 2px solid white;
    border-bottom: 3px solid white;
    transform: rotate(45deg);
  }
  .label{
    text-transform: capitalize;
  }
}

</style>

