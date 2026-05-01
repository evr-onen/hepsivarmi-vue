<script setup lang="ts">
import ProductCard from '~/domains/home/components/productCard/productCard.vue';
import useShowProduct from '~/domains/product/composables/useShowProduct';
import { allProducts } from '~/domains/product/composables/variables';
import PriceSlider from '~/domains/home/components/filter/PriceSlider/index.vue';
import { filterProductsForm, filteredProducts, filterItemData } from '~/domains/home/composables/variables';
import useHome from '~/domains/home/composables/useHome';
import PageBanner from '~/domains/home/components/pageBanner/index.vue';
import Breadcrumb from '~/domains/app/components/ui/breadcrumb/index.vue';
import Select from '~/domains/app/components/form/Select/index.vue';
import type { IProduct } from '~/domains/product/types/productTypes';
import useShowWishlist from '~/domains/wishlist/composables/useShowWishlist';
import useAuthStore from '~/domains/auth/stores/useAuthStore';

// init & hooks
const { onGetWishlistsByUser } = useShowWishlist();
const { user } = useAuthStore();
if (user.id) {
  onGetWishlistsByUser()
}

const {
  onFilterProducts,
  onSelectCategory,
  prepareFilterItemData,
  isItemSelected,
  isitWished,
  handleFilterItemClick
} = useHome();
const { onGetProducts, } = useShowProduct();


// vars
const priceRange = ref<number[]>([0, 1000]);
const selectedCategory = ref(null);

// computed vars
const minPrice = computed(() => {
  const price = filterItemData.value?.price;
  if (price && Array.isArray(price) && price.length >= 2) {
    return Number(price[0]) || 0;
  }
  return 0;
})

const maxPrice = computed(() => {
  const price = filterItemData.value?.price;
  if (price && Array.isArray(price) && price.length >= 2) {
    return Number(price[1]) || 1000;
  }
  return 1000;
})

const breadcrumbItems = computed(() => {
  if (selectedCategory.value) {
    return [
      { label: 'Home', link: '/' },
      { label: 'Products', link: '#' },
      { label: selectedCategory.value.name as string, link: '#' }
    ]
  }
  return [
    { label: 'Home', link: '/' },
    { label: 'Products', link: '#' }
  ]
})

// lifecycle hooks
watch(selectedCategory, (newVal) => {
  if (newVal) {
    onSelectCategory(newVal)
  }
  if (newVal === null) {
    filteredProducts.value = allProducts.value;
  }
})

watch([minPrice, maxPrice], ([min, max]) => {
  if (min !== undefined && max !== undefined && typeof min === 'number' && typeof max === 'number') {
    priceRange.value = [min, max];
  }
}, { immediate: true })

watch(priceRange, (newVal) => {
  if (newVal && newVal.length === 2) {
    filterProductsForm.value.price = [newVal[0], newVal[1]];
  }
}, { immediate: true })

onMounted(async () => {
  await onGetProducts();
  filteredProducts.value = allProducts.value;
  prepareFilterItemData();
})

// handlers
const onSelectProduct = async (product: IProduct) => {
  navigateTo(`/product/${product.id}`);
}

</script>

<template>
  <NuxtLayout name="home">
    <PageBanner title="Home" description="Discover our wide range of quality products with the best prices" image="/images/banner/home-banner.jpg" />
    <div class="content-page flex min-h-[calc(100vh-300px)]">
      <div class="content-layout">
        <div class="filter-menu">
          <div class="selectCategory">
            <Select
              v-model="selectedCategory"
              class="category-select"
              label="Category"
              clearable :options="toRaw(filterItemData.categories)"
              option-label="name"
              option-value="id"
            />
          </div>
          <div class="price-filter">
            <PriceSlider v-model="priceRange" :min="Number(minPrice)" :max="Number(maxPrice)" />
          </div>
          <div v-for="(filter, key) in filterItemData" :key="key">
                <div v-if="filter.length > 0 && key !== 'price' && key !== 'categories'" class="filter-section" >
                  <h4>{{ key }}</h4>
                  <div class="value-container">
                    <div
                      v-for="item in filter"
                      :key="typeof item === 'object' ? item.id : String(item)"
                      class="filter-item"
                      :class="{ 'selected': isItemSelected(String(key), item) }"
                      @click="handleFilterItemClick(String(key), item)"
                    >
                      {{ typeof item === 'object' ? item.name : item }}
                    </div>
                  </div>
                </div>
            </div>
            <div class="filter-apply-button" @click="onFilterProducts">Filter Apply</div>
        </div>
        <div class="product-list-container">
          <div class="breadcrumb">
            <Breadcrumb :items="breadcrumbItems" />
          </div>
          <div class="product-list">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :is-in-wishlist="isitWished(product.id)" :product-data="product" @click="onSelectProduct(product)" />
          </div>
        </div>
      </div>
     
    </div>
  </NuxtLayout>
</template> 

<style lang="scss" scoped>
.content-page {
  width: 100%;
  max-width: 1240px;
  margin-inline: auto;
  padding: 0 1.25rem;
  padding-top: 6.25rem;

  .content-layout {
    display: flex;
    gap: 1.5rem;

    .filter-menu {
      width: 300px;
      height: 50%;
      padding: 1.25rem;
      overflow-y: auto;
      border: 1px solid #e0e0e0;
      padding: 1.25rem;
      position: relative;

      .price-filter {}

      .category-select {

        :deep(.ea-select__placeholder) {
          border-radius: 0 !important;
        }
      }

      .filter-section {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 0.5rem;

        h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #333;
        }

        .value-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;


          .filter-item {
            background-color: #F5F5F5;
            border: 1px solid #E0E0E0;
            color: #333;
            text-transform: uppercase;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.5rem 1.5rem;
            cursor: pointer;
            transition: all 200ms;

            &.selected {
              background-color: #EEEEEE;
              border-color: #BDBDBD;
            }
          }

          .filter-item:hover {
            background-color: #EEEEEE;
            border-color: #BDBDBD;
          }
        }
      }

      .filter-apply-button {
        position: sticky;
        bottom: 0;
        width: 100%;
        height: 40px;
        background-color: #83B735;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background-color: #cbb5b5;
        }

        &:active {
          background-color: #cbb5b5;
        }
      }
    }

    .product-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: min-content;
      gap: 1.5rem;
      align-items: start;

    }

    .breadcrumb {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 1.5rem;
    }
  }
}

.property-buttonStyle {
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  color: #333;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    background-color: #EEEEEE;
    border-color: #BDBDBD;
  }
}
</style>