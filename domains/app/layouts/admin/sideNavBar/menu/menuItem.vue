<template>
    <div class="menu-item-container">
        <div class="menu-item" :class="{'isActiveMenu': icActiveMenuGroup}" @click="toggleSubMenu">
                <div class="menu-item-icon">
                    <Icon :name="menuLinkItem.icon" class="text-2xl h-4 w-4" />
                </div>
                <div class="menu-item-name">
                    {{ menuLinkItem.name }}
                </div>
                <div v-if="menuLinkItem.children" class="menu-item-children-icon" :class="{'activeIcon': activeSubMenu, }">
                    <Icon name="mdi:chevron-right" class="text-2xl h-4 w-4" />
                </div>
        </div>

        <div
            v-if="menuLinkItem.children"
            class="menu-item-children"
            :class="{'active': activeSubMenu, }"
        >
            <div 
                v-for="child in menuLinkItem.children"
                :key="child.name"
                class="menu-item-children-item"
                :class="{'isActiveMenu': isActiveMenuItem(child.path)}"
            >
                <Icon :name="child.icon || 'octicon:dash-24'" class="text-2xl h-4 w-4" />
                <div class="menu-item-children-item-name">{{ child.name }}</div>
            </div>
        </div>
    </div>
    </template>

<script setup lang="ts">
import type { MenuItemProps } from '../../../../types/adminLayoutTypes'

const props = defineProps<MenuItemProps>()
const route = useRoute()

const activeSubMenu = ref(false)

const toggleSubMenu = () => {
    activeSubMenu.value = !activeSubMenu.value
}

const subMenuHeightCalculation = computed(() => {
    if(!props.menuLinkItem.children) return 0
    const subMenuHeight = props.menuLinkItem.children.length * 1.8125 + 1
    return subMenuHeight + 'rem'
})

const icActiveMenuGroup = computed(() => {
    if('children' in props.menuLinkItem){
        return props.menuLinkItem.children?.some(child => route.path.includes(child.path))
    }
    return route.path.includes(props.menuLinkItem.path)
})

const isActiveMenuItem = (path: string) => {
    return route.path.includes(path)
}
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
.isActiveMenu{
    color: #fff !important;
}
.activeIcon{
    transform: rotate(90deg);
}
</style>