<template>

    <div role="main" class="main">

        <section class="page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-7" style="background-image: url(img/page-header/a.jpg);">
            <div class="container">
                <div class="row mt-5">
                    <div class="col-md-12 align-self-center order-1 pb-1">
                        <ul class="breadcrumb d-block text-center appear-animation animated fadeIn appear-animation-visible" data-appear-animation="fadeIn" data-appear-animation-delay="300" style="animation-delay: 300ms;">
                            <li><router-link class="text-color-secondary" to="/">Home</router-link></li>
                            <li class="active">Products & Services</li>
                        </ul>
                    </div>
                    <div class="col-md-12 align-self-center p-static order-2 text-center">
                        <h1 class="text-9 font-weight-bold" >Products & Services</h1>
                        <span class="sub-title">What We Do</span>
                    </div>

                </div>
            </div>
        </section>

        <div class="container py-2" style="margin-top: 40px">
            <ul class="nav nav-pills sort-source sort-source-style-3 justify-content-center" data-sort-id="portfolio" data-option-key="filter" data-plugin-options="{'layoutMode': 'fitRows', 'filter': '*'}">
                <li class="nav-item active" data-option-value="*"><a class="nav-link text-1 text-uppercase active" href="#">Show All</a></li>
                <li v-for="category in categories" :key="category.id" class="nav-item" :data-option-value="`.${category.slug}`"><a class="nav-link text-1 text-uppercase" href="#">{{ category.title }}</a></li>
            </ul>

            <div class="sort-destination-loader sort-destination-loader-showing mt-4 pt-2">
                <div class="row portfolio-list sort-destination" data-sort-id="portfolio">

                    <div v-for="product in productsAndServices" :key="product.id" class="col-sm-6 col-lg-3 isotope-item" :class="product.category_slug">
                        <div class="portfolio-item">
                            <router-link :to="`/products-and-services/${product.slug}`">
                                <span class="thumb-info thumb-info-lighten border-radius-0">
                                    <span class="thumb-info-wrapper border-radius-0">
                                        <img :src="product.images[0].image" class="img-fluid border-radius-0" alt="">

                                        <span class="thumb-info-title">
                                            <span class="thumb-info-inner">{{ product.title }}</span>
                                            <span class="thumb-info-type">{{ product.category_title }}</span>
                                        </span>
                                        <span class="thumb-info-action">
                                            <span class="thumb-info-action-icon bg-dark opacity-8"><i class="fas fa-plus"></i></span>
                                        </span>
                                    </span>
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import { categoriesData, productsAndServicesData } from '@/data/products'
export default {
    name: 'product',
    data(){
        return {
            categories: categoriesData,
            productsAndServices: productsAndServicesData
        }
    },
	mounted() {
        if ($.isFunction($.fn['themePluginAnimate']) && $('[data-appear-animation]').length) {
            theme.fn.dynIntObsInit('[data-appear-animation], [data-appear-animation-svg]', 'themePluginAnimate', theme.PluginAnimate.defaults);
        }
        if ($.isFunction($.fn['themePluginSort']) && ($('[data-plugin-sort]').length || $('.sort-source').length)) {
            theme.fn.intObsInit('[data-plugin-sort]:not(.manual), .sort-source:not(.manual)', 'themePluginSort');
        }
	},
    head() {
        return {
            title: 'Products & Services',
            meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'P & T Group - Products & Services'
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: 'Product,Services,Product and Services'
            }
            ]
        }
    }

}
</script>
