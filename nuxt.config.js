export default {
    modules: ['@nuxt/http'],
    http: {
        // proxyHeaders: false
    },


    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
    title: 'P & T Group',

    meta: [

        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [

        {rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
        {rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon.png'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
        {rel:'manifest', href:'/site.webmanifest'},
        {rel:'mask-icon', href:'/safari-pinned-tab.svg', color:'#5bbad5'},

        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Quicksand:wght@400;600&display=swap' },
        { rel: 'stylesheet', href: '/vendor/bootstrap/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/vendor/fontawesome-free/css/all.min.css' },
        { rel: 'stylesheet', href: '/vendor/animate/animate.compat.css' },
        { rel: 'stylesheet', href: '/vendor/simple-line-icons/css/simple-line-icons.min.css' },
        { rel: 'stylesheet', href: '/vendor/owl.carousel/assets/owl.carousel.min.css' },
        { rel: 'stylesheet', href: '/vendor/owl.carousel/assets/owl.theme.default.min.css' },
        { rel: 'stylesheet', href: '/vendor/magnific-popup/magnific-popup.min.css' },
        { rel: 'stylesheet', href: '/css/theme.css' },
        { rel: 'stylesheet', href: '/css/theme-elements.css' },
        { rel: 'stylesheet', href: '/css/custom.css' }
    ],
    script: [
        {
            src:'/vendor/modernizr/modernizr.min.js'
        },
        {
            src:'/vendor/jquery/jquery.min.js'
        },
        {
            src:'/vendor/jquery.appear/jquery.appear.min.js'
        },
        {
            src:'/vendor/jquery.easing/jquery.easing.min.js'
        },
        {
            src:'/vendor/jquery.cookie/jquery.cookie.min.js'
        },
        {
            src:'/vendor/popper/umd/popper.min.js'
        },
        {
            src:'/vendor/bootstrap/js/bootstrap.min.js'
        },
        {
            src:'/vendor/jquery.validation/jquery.validate.min.js'
        },
        {
            src:'/vendor/lazysizes/lazysizes.min.js'
        },
        {
            src:'/vendor/isotope/jquery.isotope.min.js'
        },
        {
            src:'/vendor/owl.carousel/owl.carousel.min.js'
        },
        {
            src:'/vendor/magnific-popup/jquery.magnific-popup.min.js'
        },
        {
            src:'/vendor/vide/jquery.vide.min.js'
        },
        {
            src:'/vendor/vivus/vivus.min.js'
        },
        {
            src:'/js/theme.js'
        },
        {
            src:'/js/views/view.contact.js'
        }
    ]

    },

  // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

  // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

  // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },
    router: {
        linkActiveClass: 'active'
    }

}
