<template>


    <div role="main" class="main">
        <section class="page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-7" style="background-image: url(/img/page-header/a.jpg);">
            <div class="container">
                <div class="row mt-5">
                    <div class="col-md-12 align-self-center order-1 pb-1">
                        <ul class="breadcrumb d-block text-center appear-animation animated fadeIn appear-animation-visible" data-appear-animation="fadeIn" data-appear-animation-delay="300" style="animation-delay: 300ms;">
                            <li><router-link class="text-color-secondary" to="/">Home</router-link></li>
                            <li><router-link class="text-color-secondary" to="/products-and-services">Products & Services</router-link></li>
                            <li class="active">{{ product.title }}</li>
                        </ul>
                    </div>
                    <div class="col-md-12 align-self-center p-static order-2 text-center">
                        <h1 class="text-9 font-weight-bold" >{{ product.title }}</h1>
                        <span class="sub-title">{{ product.brand }}</span>
                    </div>

                </div>
            </div>
        </section>

        <div class="container py-2">
            <div class="row pb-4 mb-2">
                <div class="col-md-6 mb-4 mb-md-0 appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="300">
                    <div class="row">
                        <div class="lightbox w-100" data-plugin-options="{'delegate': 'a', 'type': 'image', 'gallery': {'enabled': true}, 'mainClass': 'mfp-with-zoom', 'zoom': {'enabled': true, 'duration': 300}}">
                            <div class="owl-carousel owl-theme stage-margin" data-plugin-options="{'items': 1, 'margin': 10, 'loop': false, 'nav': true, 'dots': false, 'stagePadding': 40}">
                                <div v-for="image in product.images" :key="image.id">
                                    <a class="img-thumbnail img-thumbnail-no-borders img-thumbnail-hover-icon" :href="image.image">
                                        <img class="img-fluid" :src="image.image" :alt="product.brand" width="200" height="200">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="overflow-hidden">
                        <div class="size">
                            <h2 class="text-color-dark font-weight-normal text-4 mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="600">
                                <strong class="font-weight-extra-bold">{{ product.title }}</strong>
                            </h2>
                        </div>
                        <br/>
                        <h4 class="text-color-dark font-weight-normal text-4 mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="600"><strong class="font-weight-extra-bold">Brand - </strong>{{ product.brand }}</h4>
                        <h4 class="text-color-dark font-weight-normal text-4 mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="600"><strong class="font-weight-extra-bold">Model - </strong>{{ product.model }}</h4><br/>
                    </div>

                    <h4 class="text-color-dark font-weight-normal text-4 mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="600">
                        <strong class="font-weight-extra-bold">Description</strong>
                    </h4>
                    <p class="appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="800">
                        {{ product.description }}
                    </p>

                </div>
            </div>

        </div>
    </div>

</template>
<style scoped>
.size{
	font-size: 20px;

}
</style>
<script>
import { categoriesData, productsAndServicesData } from '@/data/products'

export default {
    computed: {
        product() {
            return productsAndServicesData.find(product => product.slug == this.$route.params.slug)
        }
    },
    mounted(){

        if ($.isFunction($.fn['themePluginAnimate']) && $('[data-appear-animation]').length) {
            theme.fn.dynIntObsInit('[data-appear-animation], [data-appear-animation-svg]', 'themePluginAnimate', theme.PluginAnimate.defaults);
        }
        if ($.isFunction($.fn['themePluginCarousel']) && $('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').length) {
            theme.fn.intObsInit('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)', 'themePluginCarousel');
        }
        if ($.isFunction($.fn['themePluginLightbox']) && ($('[data-plugin-lightbox]').length || $('.lightbox').length)) {
            theme.fn.execOnceTroughEvent('[data-plugin-lightbox]:not(.manual), .lightbox:not(.manual)', 'mouseover.trigger.lightbox', function() {
                var $this = $(this),
                    opts;
                var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                if (pluginOptions)
                    opts = pluginOptions;
                $this.themePluginLightbox(opts);
            });
        }
    },

    head() {
        return {
            title: this.product ? this.product.title : 'P & T Products',
            meta: [
            {
                hid: 'description',
                name: 'description',
                content: this.product ? this.product.title : 'P & T Products'
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: this.product ? this.product.title : 'P & T Products'
            }
            ]
        }
    }
}
</script>
