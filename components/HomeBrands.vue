<template>
    <section class="custom-section-padding">
        <div class="container">
            <div class="row mb-4">
                <div class="col">
                    <h2 class="font-weight-bold text-color-dark mb-3">- Our Brands</h2>
                </div>
            </div>
            <div class="row">
                <div class="owl-carousel brands-carousel owl-theme" data-plugin-options="{'items': 4, 'autoplay': true, 'autoplayTimeout': 3000}">
                    <div>
                        <img class="img-fluid" src="/img/logos/customer-euroclone.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/brands-b-medical.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/brands-alvo-medical.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/brands-alp-co.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/brands-elitech-group.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/brand-slee-medical.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {
        if ($.isFunction($.fn['themePluginCarousel']) && $('[data-plugin-carousel]:not(.manual), .brands-carousel:not(.manual)').length) {
            theme.fn.intObsInit('[data-plugin-carousel]:not(.manual), .brands-carousel:not(.manual)', 'themePluginCarousel');
        }
    }
}
</script>