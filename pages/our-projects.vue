<template>

<div role="main" class="main">
    <section class="page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-7" style="background-image: url(img/page-header/a.jpg);">
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-12 align-self-center order-1 pb-1">
                    <ul class="breadcrumb d-block text-center appear-animation animated fadeIn appear-animation-visible" data-appear-animation="fadeIn" data-appear-animation-delay="300" style="animation-delay: 300ms;">
                        <li><router-link class="text-color-secondary" to="/">Home</router-link></li>
                        <li class="active">Projects</li>
                    </ul>
                </div>
                <div class="col-md-12 align-self-center p-static order-2 text-center">
                    <h1 class="text-9 font-weight-bold" >Projects</h1>
                    <span class="sub-title">What We have Done</span>
                </div>

            </div>
        </div>
    </section>

    <div class="container py-2">
        <div class="mt-4 py-2">
            <div class="row portfolio-list">

                <div v-for="project in projects" :key="project.id" class="col-sm-6 col-lg-3">
                    <div class="portfolio-item">
                        <a href="javascript:;" role="button" @click="handleShowProject(project.id)">
                            <span class="thumb-info thumb-info-lighten border-radius-0">
                                <span class="thumb-info-wrapper border-radius-0">
                                    <img :src="project.images[0].image" class="img-fluid border-radius-0" :alt="project.title">

                                    <span class="thumb-info-title">
                                        <span class="thumb-info-inner">{{ project.title }}</span>
                                    </span>
                                    <span class="thumb-info-action">
                                        <span class="thumb-info-action-icon bg-dark opacity-8"><i class="fas fa-plus"></i></span>
                                    </span>
                                </span>
                            </span>
                        </a>
                        <div class="modal fade" :id="`project_${project.id}`" tabindex="-1" :aria-labelledby="project.slug" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content" >
                                    <div class="modal-header" >

                                        <h4 class="modal-title" :id="project.slug">{{ project.title }}</h4>

                                    </div>
                                    <div class="modal-body">
                                        <span class="owl-carousel owl-theme dots-inside m-0" data-plugin-options="{'items': 1, 'margin': 20, 'animateOut': 'fadeOut', 'autoplay': true, 'autoplayTimeout': 3000}">
                                            <span v-for="image in project.images" :key="image.id">
                                                <img :src="image.image" class="img-fluid border-radius-0" :alt="project.title">
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
</div>


</template>

<script>
import { projectsData } from '@/data/projects'
export default {
    name: 'projects',
    data(){
        return {
            projects: projectsData
        }
    },
	mounted() {
		if ($.isFunction($.fn['themePluginAnimate']) && $('[data-appear-animation]').length) {
            theme.fn.dynIntObsInit('[data-appear-animation], [data-appear-animation-svg]', 'themePluginAnimate', theme.PluginAnimate.defaults);
        }
        if ($.isFunction($.fn['themePluginCarousel']) && $('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').length) {
            theme.fn.intObsInit('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)', 'themePluginCarousel');
        }

	},
    methods: {
        handleShowProject(id){
            $(`#project_${id}`).modal()
        },
    },

    head() {
        return {
            title: 'Our Projects',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'P & T Group - Projects'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'project,Projects,projects,Project'
                }
            ]
        }
    }

}
</script>
