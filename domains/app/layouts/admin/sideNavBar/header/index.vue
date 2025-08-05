<template>
    <div class="nav-menu-header" :class="{ 'active': isMenuActive }">
        <div class="Buttons gap-y-2">
            <div class="menu-icon" @click="toggleMenu">
                <Icon name="mdi:menu" class="text-2xl h-4 w-4" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isMenuActive: boolean
    toggleMenu: () => void
}>()

</script>

<style scoped>
.nav-menu-header{
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 3.75rem;
    padding-inline: 1.25rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    .Buttons{
        display: flex;
        justify-content: flex-end;

        > .menu-icon{
            width: 2.5rem;
            height: 2.5rem;
            cursor: pointer;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
            
            > .icon{
                width: 1.5rem;
                height: 1.5rem;
            }
        }
    }
}


</style>