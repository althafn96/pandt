<template>
    <section class="section-secondary custom-section-padding-2">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h2 class="font-weight-bold text-color-dark mb-3">- Product Categories</h2>
                </div>
            </div>
        </div>
        <div class="owl-carousel categories-carousel show-nav-title custom-both-sides-shadow custom-dots-position-2 custom-dots-style-1 custom-xs-arrows-style-2 mb-0"
            data-plugin-options="{'items': 5, 'loop': false, 'dots': true, 'nav': false}">
            <div v-for="category in categories" :key="category.id">
                <router-link :to="`/products-and-services#${category.slug}`"  class="text-decoration-none">
                    <span class="thumb-info custom-thumb-info-style-1 thumb-info-hide-wrapper-bg">
                        <span class="thumb-info-wrapper m-0">
                            <img :src="category.thumb" class="img-fluid" alt="">
                        </span>
                        <span class="thumb-info-caption bg-color-secondary p-4 pt-5 pb-5">
                            <span class="custom-thumb-info-title">
                                <span class="custom-thumb-info-name font-weight-semibold text-color-dark text-4">
                                    {{ category.title }}
                                </span>

                            </span>
                            <span class="custom-arrow"></span>
                        </span>
                    </span>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
import { categoriesData } from '@/data/products'

export default {
    data(){
        return {
            categories: categoriesData
        }
    },
    mounted() {
        if ($.isFunction($.fn['themePluginCarousel']) && $('[data-plugin-carousel]:not(.manual), .categories-carousel:not(.manual)').length) {
            theme.fn.intObsInit('[data-plugin-carousel]:not(.manual), .categories-carousel:not(.manual)', 'themePluginCarousel');
        }
    }
}
</script>
