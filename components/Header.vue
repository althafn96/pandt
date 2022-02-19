<template>

    <header id="header" class="header-transparent header-transparent-dark-bottom-border header-effect-shrink">
        <div class="header-body border-top-0 bg-dark box-shadow-none">
            <div class="header-container container">
                <div class="header-row">
                    <div class="header-column">
                        <div class="header-row">
                            <div class="header-logo">
                                <router-link to="/">
                                    <img alt="P & T Logo" height="auto"
                                        src="/img/logo-default-slim-dark-small.png">
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="header-column justify-content-end">
                        <div class="header-row">
                            <div
                                class="header-nav header-nav-links header-nav-dropdowns-dark header-nav-light-text order-2 order-lg-1">
                                <div
                                    class="header-nav-main header-nav-main-mobile-dark header-nav-main-square header-nav-main-dropdown-no-borders header-nav-main-effect-2 header-nav-main-sub-effect-1">
                                    <nav class="collapse">

                                        <ul class="nav nav-pills" id="mainNav">
                                            <li class="nav-item">
                                                <router-link to="/" exact  class="nav-link" >Home</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/products-and-services"  class="nav-link" > Products & Services</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/our-projects" exact class="nav-link"> Our Projects</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <a href="javascript:;" exact class="nav-link"> News</a>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/about-us"  class="nav-link">About Us</router-link>
                                            </li>
                                        </ul>

                                    </nav>
                                </div>
                                <button class="btn header-btn-collapse-nav" data-toggle="collapse"
                                    data-target=".header-nav-main nav">
                                    <i class="fas fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

</template>


<script>
export default {
    data() {
        return {
            headerStickyOptions: null,
            hasSideHeader: false,
            htmlEl: null,
            initialHeaderContainerHeight: 0,
            minHeight: 0,
            initialHeaderTopHeight: 0
        }
    },
    mounted() {
        // theme.StickyHeader.initialize();
        theme.Nav.initialize();

        if(window.scrollY == 0) {
            $('#header .header-container').removeClass('height', '100px')
            $('html').removeClass('sticky-header-active')
            $('.header-logo img').css('width', '82px')
        } else {
            $('#header .header-container').addClass('height', '70px')
            $('html').addClass('sticky-header-active')
            $('.header-logo img').css('width', '50px')
        }

        $(window).scroll(function (event) {
            if(window.scrollY == 0) {
                $('#header .header-container').removeClass('height', '100px')
                $('html').removeClass('sticky-header-active')
                $('.header-logo img').css('width', '82px')
            } else {
                $('#header .header-container').addClass('height', '70px')
                $('html').addClass('sticky-header-active')
                $('.header-logo img').css('width', '50px')
            }
        });
    },

    methods: {

    },
}
</script>
<style scoped>
a.active{
    color: #000;
}

.header-body {
    top: 0;
    position: fixed !important;
}

#header .header-container {
    min-height: 70px;
}
</style>
