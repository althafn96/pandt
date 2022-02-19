<template>
    <div class="owl-carousel owl-carousel-light owl-carousel-light-init-fadeIn owl-theme manual dots-inside dots-horizontal-center show-dots-hover show-dots-xs show-dots-sm show-dots-md dots-light custom-nav-arrows-1 nav-dark nav-md nav-font-size-md show-nav-hover mb-0"
				data-plugin-options="{'autoplayTimeout': 10000}" style="height: 100vh;">
        <div class="owl-stage-outer">
            <div class="owl-stage">

                <div class="owl-item position-relative pt-5"
                    style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(/img/banners/p_t-banner-0.jpg); background-size: cover; background-position: center;">
                    <div class="container position-relative z-index-3 pb-5 h-100">
                        <div class="row align-items-center pb-5 h-100">
                            <div class="col">
                                <h1 class="custom-secondary-font text-color-light font-weight-extra-bold text-8 line-height-1 line-height-sm-3 mb-5 appear-animation"
                                    data-appear-animation="fadeInLeftShorterPlus"
                                    data-appear-animation-delay="500"
                                    data-plugin-options="{'minWindowWidth': 0}">#1 Company<br><span
                                        class="custom-secondary-font text-4-5">For all your medical equipment needs</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="owl-item position-relative pt-5"
                    style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(/img/banners/p_t-banner-1.jpg); background-size: cover; background-position: center;">
                    <div class="container position-relative z-index-3 pb-5 h-100">
                        <div class="row align-items-center pb-5 h-100">
                            <div class="col">
                                <h1 class="custom-secondary-font text-color-light font-weight-extra-bold text-8 line-height-1 line-height-sm-3 mb-5 appear-animation"
                                    data-appear-animation="fadeInLeftShorterPlus"
                                    data-appear-animation-delay="500"
                                    data-plugin-options="{'minWindowWidth': 0}">All your<br><span
                                        class="custom-secondary-font text-4-5">Laboratory equipments</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="owl-item position-relative pt-5"
                    style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(/img/banners/p_t-banner-2.jpg); background-size: cover; background-position: center;">
                    <div class="container position-relative z-index-3 pb-5 h-100">
                        <div class="row align-items-center pb-5 h-100">
                            <div class="col">
                                <h1 class="custom-secondary-font text-color-light font-weight-extra-bold text-8 line-height-1 line-height-sm-3 mb-5 appear-animation"
                                    data-appear-animation="fadeInLeftShorterPlus"
                                    data-appear-animation-delay="500"
                                    data-plugin-options="{'minWindowWidth': 0}">Full Range<br><span
                                        class="custom-secondary-font text-4-5">Of quality hospital furniture</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="owl-item position-relative pt-5"
                    style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(/img/banners/p_t-banner-3.jpg); background-size: cover; background-position: center;">
                    <div class="container position-relative z-index-3 pb-5 h-100">
                        <div class="row align-items-center pb-5 h-100">
                            <div class="col">
                                <h1 class="custom-secondary-font text-color-light font-weight-extra-bold text-8 line-height-1 line-height-sm-3 mb-5 appear-animation"
                                    data-appear-animation="fadeInLeftShorterPlus"
                                    data-appear-animation-delay="500"
                                    data-plugin-options="{'minWindowWidth': 0}">Comprehensive Coverage<br><span
                                        class="custom-secondary-font text-4-5">For blood bank equipment</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="owl-item position-relative pt-5"
                    style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(/img/banners/p_t-banner-4.jpg); background-size: cover; background-position: center;">
                    <div class="container position-relative z-index-3 pb-5 h-100">
                        <div class="row align-items-center pb-5 h-100">
                            <div class="col">
                                <h1 class="custom-secondary-font text-color-light font-weight-extra-bold text-8 line-height-1 line-height-sm-3 mb-5 appear-animation"
                                    data-appear-animation="fadeInLeftShorterPlus"
                                    data-appear-animation-delay="500"
                                    data-plugin-options="{'minWindowWidth': 0}">We are<br><span
                                        class="custom-secondary-font text-4-5">Utterly Customer Driven</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="owl-nav">
            <button type="button" role="presentation" class="owl-prev"></button>
            <button type="button" role="presentation" class="owl-next"></button>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        theme.fn.intObsInit('.owl-carousel-light', 'themePluginCarouselLight')
    }
}
</script>
