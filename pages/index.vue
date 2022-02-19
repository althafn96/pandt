<template>

    <div>
        <HomeSlider />

        <section class="looking-for custom-position-1 custom-md-border-top z-index-1">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 col-lg-7">
                        <div class="looking-for-box">
                            <h2>- <span class="text-1 custom-secondary-font">Are you looking for a dependable partner</span><br>
                                For all medical equipment requirements?</h2>
                            <p>Trusted  and proven  with an impeccable service record</p>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex justify-content-md-end mb-4 mb-md-0">
                        <a class="text-decoration-none" href="tel:+94112807076" target="_blank" title="Call Us Now">
                            <span class="custom-call-to-action">
                                <span style="color: #1d74ef !important" class="action-title text-color-secondary">Call Us Now</span>
                                <span class="action-info text-color-light">94112807076</span>
                            </span>
                        </a>
                    </div>
                    <div class="col-md-3 col-lg-2">
                        <a class="text-decoration-none" href="mail:ptcorp@sltnet.lk" target="_blank"
                            title="Email Us Now">
                            <span class="custom-call-to-action">
                                <span style="color: #1d74ef !important" class="action-title text-color-secondary">Email Us Now</span>
                                <span class="action-info text-color-light"><span class="__cf_email__"
                                        data-cfemail="1875797174587d60797568747d367b7775">ptcorp@sltnet.lk</span></span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Us -->
        <HomeAbout />

        <!-- Why Us -->
        <HomeWhyUs />

        <!-- Our Brands -->
        <HomeBrands />

        <!-- Product categories -->
        <HomeCategories />

        <!-- Our Customers -->
        <HomeCustomers />
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
}
</script>
