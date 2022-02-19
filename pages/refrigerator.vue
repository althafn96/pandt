<template>
    
  
    <div role="main" class="main">
    <section class="page-header page-header-modern bg-color-light-scale-1 page-header-md ">
					<div class="container-fluid">
						<div class="row align-items-center">

							

						</div>
					</div>
				</section>

<div id="examples" class="container py-2">

					<div class="row pb-4 mb-2">
						<div class="col-md-6 mb-4 mb-md-0 appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="300">
						<div class="row">
											
				
							<div class="col-lg-3">
										
											<a class="img-thumbnail d-block lightbox" href="img/products/product1.jpg" data-plugin-options="{'type':'image'}">
												<img class="img-fluid" src="img/products/product1.jpg" alt="Project Image">
											</a>
										</div>
							
									<div class="col-lg-3">
										
											<a class="img-thumbnail d-block lightbox" href="img/products/product2.jpg" data-plugin-options="{'type':'image'}">
												<img class="img-fluid" src="img/products/product2.jpg" alt="Project Image">
											</a>
										</div>
											<div class="col-lg-3">
										
											<a class="img-thumbnail d-block lightbox" href="img/products/product3.jpg" data-plugin-options="{'type':'image'}">
												<img class="img-fluid" src="img/products/product3.jpg" alt="Project Image">
											</a>
										</div>
										<div class="col-lg-3">
										
											<a class="img-thumbnail d-block lightbox" href="img/products/product7.jpg" data-plugin-options="{'type':'image'}">
												<img class="img-fluid" src="img/products/product7.jpg" alt="Project Image">
											</a>
										</div>

						</div>
						<div class="row">
							<div class="col-lg-3">
										
											<a class="img-thumbnail d-block lightbox" href="img/products/product4.jpg" data-plugin-options="{'type':'image'}">
												<img class="img-fluid" src="img/products/product4.jpg" alt="Project Image">
											</a>
										</div>
							<div class="col-lg-3">
										
											<a class="img-thumbnail d-block lightbox" href="img/products/product5.jpg" data-plugin-options="{'type':'image'}">
												<img class="img-fluid" src="img/products/product5.jpg" alt="Project Image">
											</a>
										</div>
											<div class="col-lg-3">
										
											<a class="img-thumbnail d-block lightbox" href="img/products/product6.jpg" data-plugin-options="{'type':'image'}">
												<img class="img-fluid" src="img/products/product6.jpg" alt="Project Image">
											</a>
										</div>
										<div class="col-lg-3">
										
											<a class="img-thumbnail d-block lightbox" href="img/products/product8.jpg" data-plugin-options="{'type':'image'}">
												<img class="img-fluid" src="img/products/product8.jpg" alt="Project Image">
											</a>
										</div>
						</div>
						
							


						</div>


						<div class="col-md-6">
							<div class="overflow-hidden">
								


								
							<div class="size">	<h2 class="text-color-dark font-weight-normal text-4 mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="600"><strong class="font-weight-extra-bold"> Blood Bank Refrigerator</strong></h2></div><br/>
								<h4 class="text-color-dark font-weight-normal text-4 mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="600"><strong class="font-weight-extra-bold">Brand - </strong>B Medical - luxembourg</h4>
								<h4 class="text-color-dark font-weight-normal text-4 mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="600"><strong class="font-weight-extra-bold">Model - </strong>There are many models available with different storage capacities namely B51, B131, B291 ,B381, B401 ,B501, B701 ,B901</h4><br/>
							</div> 

							<h4 class="text-color-dark font-weight-normal text-4 mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="600"><strong class="font-weight-extra-bold">Description</strong></h4><p class="appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="800">Blood Bank Refrigerators are devices intended for the safe storage of whole blood and blood components at temperatures ranging from +2°C to +6°C.Especially designed for blood transfusion services, blood processing centers, blood banks, and hospitals, our Blood Bank Refrigerators meet the highest regulatory requirements. On top of being compliant with the DIN 58371 and Önorm K 2030, they are also classified as medical devices Class II(a) (EU), Class II (FDA) and are AABB standards-compliant.All models deliver high performances in terms of temperature control and energy consumption, while also offering a remote monitoring solution.</p>

							
							
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
export default {
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
}
}
</script>


