<template>

			<section class="about-us custom-section-padding" id="about-us">
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-lg-6">
							<h2 class="font-weight-bold text-color-dark">- About Us</h2>
							<p class="pl-4">
								Founded in the year of 1989 and since then it has been functioning as a leading equipment supplier and service provider to the Health, Research, Blood bank and Universities sectors.<br/>
								Blood Bank equipment has been our focus for well over 30 years.

							</p>
							<p class="pl-4">
								In the Research and University sectors too, we have executed supplies in a range of equipment and have made significant contributions, which includes Bio Safety cabinets, Operating Theater Tables  and Lab equipment.
							</p>
							<div class="pl-4">
								<router-link class="btn btn-outline custom-border-width btn-primary mt-3 mb-2 custom-border-radius font-weight-semibold text-uppercase"
									to="/about-us" >Read More</router-link>
							</div>
						</div>
						<div class="col-md-6 col-lg-6">
							<div class="content-grid custom-content-grid mt-5 mb-4">
								<div class="row content-grid-row">
									<div class="content-grid-item col-lg-6 bg-color-light p-4">
										<div class="counters">
											<div class="counter custom-sm-counter-style">
												<img class="counter-icon"
													src="/img/icons/icon-1.png" alt />
												<strong class="text-color-primary custom-primary-font" data-to="32"
													data-append="+">0</strong>
												<label>Years of Service</label>
											</div>
										</div>
									</div>
									<div class="content-grid-item col-lg-6 p-4">
										<div class="counters">
											<div class="counter margin-style-2 custom-sm-counter-style">
												<img class="counter-icon"
													src="/img/icons/icon-2.png" alt />
												<strong class="text-color-primary custom-primary-font" data-to="20"
													data-append="+">0</strong>
												<label>Global Brands</label>
											</div>
										</div>
									</div>
								</div>
								<div class="row content-grid-row">
									<div class="content-grid-item col-lg-6 p-4">
										<div class="counters">
											<div class="counter custom-sm-counter-style">
												<img class="counter-icon"
													src="/img/icons/icon-3.png" alt />
												<strong class="text-color-primary custom-primary-font" data-to="200"
													data-append="+">0</strong>
												<label>Products</label>
											</div>
										</div>
									</div>
									<div class="content-grid-item col-lg-6 bg-color-light p-4">
										<div class="counters">
											<div class="counter margin-style-2 custom-sm-counter-style">
												<img class="counter-icon"
													src="/img/icons/icon-4.png" alt />
												<strong class="text-color-primary custom-primary-font" data-to="100"
													data-append="+">0</strong>
												<label>Customers</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
</template>

<script>
export default {
    mounted() {
        if ($.isFunction($.fn['themePluginCounter']) && ($('[data-plugin-counter]').length || $('.counters [data-to]').length)) {
            theme.fn.dynIntObsInit('[data-plugin-counter]:not(.manual), .counters [data-to]', 'themePluginCounter', theme.PluginCounter.defaults);
        }
    }
}
</script>
