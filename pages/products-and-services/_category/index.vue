<template>
    <div role="main" class="main">
        <section class="page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-7" style="background-image: url(/img/page-header/a.jpg);">
            <div class="container">
                <div class="row mt-5">
                    <div class="col-md-12 align-self-center order-1 pb-1">
                        <ul class="breadcrumb d-block text-center appear-animation animated fadeIn appear-animation-visible" data-appear-animation="fadeIn" data-appear-animation-delay="300" style="animation-delay: 300ms;">
                            <li><router-link class="text-color-secondary" to="/">Home</router-link></li>
                            <li><router-link class="text-color-secondary" to="/products-and-services">Products & Services</router-link></li>
                            <li class="active">{{ category.title }}</li>
                        </ul>
                    </div>
                    <div class="col-md-12 align-self-center p-static order-2 text-center">
                        <h1 class="text-9 font-weight-bold" >{{ category.title }}</h1>
                    </div>

                </div>
            </div>
        </section>

        <div class="container py-2" style="margin-top: 40px">
            <div class="my-4">
                <div class="row portfolio-list sort-destination" data-sort-id="portfolio">

                    <div v-for="segment in category.segments" :key="segment.id" class="col-sm-6 col-lg-3">
                        <div class="portfolio-item">
                            <router-link :to="`/products-and-services/${$route.params.category}/${segment.slug}`">
                                <span class="thumb-info thumb-info-lighten border-radius-0">
                                    <span class="thumb-info-wrapper border-radius-0">
                                        <img :src="segment.thumb" class="img-fluid border-radius-0" alt="">

                                        <span class="thumb-info-title">
                                            <span class="thumb-info-inner">{{ segment.title }}</span>
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
import { productsAndServicesData } from '@/data/products'

export default {
    computed: {
        category() {
            return productsAndServicesData.find(product => product.category_slug == this.$route.params.category)
        }
    },

    mounted(){
        if ($.isFunction($.fn['themePluginAnimate']) && $('[data-appear-animation]').length) {
            theme.fn.dynIntObsInit('[data-appear-animation], [data-appear-animation-svg]', 'themePluginAnimate', theme.PluginAnimate.defaults);
        }
    },

    head() {
        return {
            title: this.category ? this.category.category_title : 'Products & Services',
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
