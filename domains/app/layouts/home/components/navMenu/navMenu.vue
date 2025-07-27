<template>
    <div class="nav-menu">
        <ul>
            <li>
                <NuxtLink to="/">
                    Home
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/category">
                    Category
                </NuxtLink>
            </li>
        </ul>        
    </div>
</template>

<script setup lang="ts">




</script>

<style lang="postcss">
    .nav-menu {

        ul {
            display: flex;
            align-items: center;
            gap: 1rem;

            li{
                height: 100%;
                font-weight: 600;
                color : var(--primary-400);
                transition: color 0.3s ease;
            }
            li:hover{
                color : var(--primary-600);
            }
        }

    }
</style>