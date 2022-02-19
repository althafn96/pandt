<template>
    <div>
        <Header />
        <div role="main" class="main">
            <Nuxt />
			<div class="map-above">
				<div id="googlemaps" class="map-above-map google-map m-0">
					<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.83638762266!2d79.9141588!3d6.8954961!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae250abc70f8ac3%3A0xd5be9b331b46cc70!2sTechnomedics%20International!5e0!3m2!1sen!2slk!4v1616778497721!5m2!1sen!2slk" style="border:0; width: 100%; height: 40rem" allowfullscreen="true" loading="lazy"></iframe>
				</div>
				<section class="map-above-content section section-no-border m-0 p-0">
					<div class="container">
						<div class="row">
							<div class="col-md-7 col-lg-6 bg-color-dark p-5">
								<h3 class="text-4 font-weight-bold text-color-light mb-3 mt-2">Contact Us</h3>
								<div class="feature-box feature-box-style-2 mb-4">
									<div class="feature-box-icon">
										<i class="icon-call-in icons "></i>
									</div>
									<div class="feature-box-info">
										<h6 class="mb-0 text-2 text-muted">Call us</h6>
										<a href="tel:+94112807076"
											class="text-color-light font-weight-semibold text-decoration-none">94112807076</a>
									</div>
								</div>
								<div class="feature-box feature-box-style-2 mb-3">
									<div class="feature-box-icon">
										<i class="icon-location-pin icons "></i>
									</div>
									<div class="feature-box-info">
										<h6 class="mb-0 text-2 text-muted">Our Location</h6>
										<p class="tall text-color-light font-weight-semibold">No. 57/23, Gallage Mawatha, Mirihana, Nugegoda
										</p>
									</div>
								</div>
								<h4 class="text-3 font-weight-semibold mb-0 text-muted">SEND US A MESSAGE</h4>
								<form class="contact-form"
									action="#"
									method="POST">
									<input type="hidden" value="Contact Form" name="subject" id="subject">
									<div class="contact-form-success alert alert-success d-none">
										Message has been sent to us.
									</div>
									<div class="contact-form-error alert alert-danger d-none">
										Error sending your message.
										<span class="mail-error-message text-1 d-block"></span>
									</div>
									<div class="form-row">
										<div class="form-group col-lg-6 pr-lg-2">
											<input type="text" value="" data-msg-required="Please enter your name."
												maxlength="100" class="form-control text-3 h-auto py-2"
												placeholder="Your Name..." name="name" id="name" required>
										</div>
										<div class="form-group col-lg-6 pl-lg-2">
											<input type="text" value="" data-msg-required="Please enter your phone."
												maxlength="100" class="form-control text-3 h-auto py-2"
												placeholder="Your Phone..." name="phone" id="phone" required>
										</div>
									</div>
									<div class="form-group">
										<input type="email" value=""
											data-msg-required="Please enter your email address."
											data-msg-email="Please enter a valid email address." maxlength="100"
											class="form-control text-3 h-auto py-2" placeholder="Your Email Address..."
											name="email" id="email" required>
									</div>
									<div class="form-row">
										<div class="form-group col">
											<textarea maxlength="5000" data-msg-required="Please enter your message."
												rows="4" class="form-control text-3 h-auto py-2"
												placeholder="Your Message..." name="message" id="message"
												required></textarea>
										</div>
									</div>
									<div class="form-row">
										<div class="form-group col">
											<input type="submit" value="SUBMIT"
												class="btn btn-xl btn-outline btn-secondary text-1 font-weight-bold text-uppercase"
												data-loading-text="Loading...">
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
        </div>
        <Footer />
    </div>
</template>

<script>
export default {
    mounted() {
        theme.PluginScrollToTop.initialize();
    }
}
</script>