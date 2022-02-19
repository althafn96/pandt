<template>
    <section class="custom-section-padding">
        <div class="container">
            <div class="row mb-4">
                <div class="col">
                    <h2 class="font-weight-bold text-color-dark mb-3">- Our Customers</h2>
                </div>
            </div>
            <div class="row">
                <div class="owl-carousel customers-carousel owl-theme" data-plugin-options="{'items': 4, 'autoplay': true, 'autoplayTimeout': 3000 }">
                    <div>
                        <img class="img-fluid" src="/img/logos/customer-daph.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/customer-durdans.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/customer-wayamba-university.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/customer-pdhs.png" alt="">
                    </div>
                    <div>
                        <img class="img-fluid" src="/img/logos/customer-rajarata-university.png" alt="">
        </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {
        if ($.isFunction($.fn['themePluginCarousel']) && $('[data-plugin-carousel]:not(.manual), .customers-carousel:not(.manual)').length) {
            theme.fn.intObsInit('[data-plugin-carousel]:not(.manual), .customers-carousel:not(.manual)', 'themePluginCarousel');
        }
    }
}
</script>