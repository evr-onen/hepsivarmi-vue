<template>
    <div class="menu-item-container">
        <NuxtLink class="menu-item" :class="{'activeMenu': isActiveMenu}" :to="menuLinkItem.path" @click="toggleMenu">
                <div class="menu-item-icon">
                    <Icon :name="menuLinkItem.icon" class="text-2xl h-4 w-4" />
                </div>
                <div class="menu-item-name">
                    {{ menuLinkItem.name }}
                </div>
                <div v-if="menuLinkItem.children" class="menu-item-children-icon" :class="{'activeIcon': isActiveMenu, }">
                    <Icon name="mdi:chevron-right" class="text-2xl h-4 w-4" />
                </div>
        </NuxtLink>

        <div
            v-if="menuLinkItem.children"
            class="menu-item-children"
            :class="{'active': isActiveMenu }"
        >
            <NuxtLink 
                v-for="child in menuLinkItem.children"
                :key="child.name"
                :to="child.path"
                class="menu-item-children-item"
                :class="{'activeMenu': isActiveSubMenuItem(child.path)}"
            >
                <Icon :name="child.icon || 'octicon:dash-24'" class="text-2xl h-4 w-4" />
                <div class="menu-item-children-item-name">{{ child.name }}</div>
            </NuxtLink>
        </div>
    </div>
    </template>

<script setup lang="ts">
import type { MenuItemProps } from '~/domains/app/types/adminLayoutTypes'

const props = defineProps<MenuItemProps>()
const route = useRoute()

const isActiveMenu = ref(false)

const toggleMenu = () => {
    isActiveMenu.value = !isActiveMenu.value
}

const subMenuHeightCalculation = computed(() => {
    if(!props.menuLinkItem.children) return 0
    const subMenuHeight = props.menuLinkItem.children.length * 1.8125 + 1
    return subMenuHeight + 'rem'
})

const isActiveMenuGroup = () => {
    if('children' in props.menuLinkItem){
        isActiveMenu.value = props.menuLinkItem.children!.some(child => route.path.includes(child.path))
    }else{
        isActiveMenu.value = route.path.includes(props.menuLinkItem.path)
    }
}

const isActiveSubMenuItem = (path:string) => {
    const isActive = route.path.includes(path)
    return isActive
}

onMounted(()=>{
    isActiveMenuGroup()
})
</script>

<style scoped>
.menu-item-container{

    display: flex;
    flex-direction: column;
    
    .menu-item{
        color: #abb9e8;
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: 500;
        column-gap: 1.25rem;
        cursor: pointer;
        text-transform: capitalize;

        .menu-item-children-icon{
            margin-left: auto;
            transition: transform 0.3s ease-in-out;
        }
    }

    .menu-item-children{
        padding: 0;
        padding-left: 2rem;
        height: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        opacity: 0;
        transition: height 0.4s ease-in-out, opacity 0.3s ease-in-out, padding 0.1s ease-in-out .3s;

        .menu-item-children-item{
            color: #abb9e8;
            font-size: .875rem;
            display: flex;
            align-items: center;
            column-gap: 0.25rem;
            text-transform: capitalize;
        }
    }

    .menu-item-children.active{
        height: v-bind(subMenuHeightCalculation);
        padding: .5rem;
        opacity: 1;
        transition: height 0.3s ease-in-out, opacity 0.3s ease-in-out 0.1s, padding 0.1s ease-in-out ;
    }
}
.activeMenu{
    color: #fff !important;
}
.activeIcon{
    transform: rotate(90deg);
}
</style>