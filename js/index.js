const slider = new Slider({
	slideToShow: 3,
	showDots: true,
	slideToScroll: 1,
	speed: 600,
	element: document.querySelector('.js_slick'),
	responsive: [
		{
			breakpoint: 768,
			setting: {
				slideToShow: 2,
				showDots: true,
				slideToScroll: 2
			}
		},

		{
			breakpoint: 580,
			setting: {
				slideToShow: 1
			}
		}
	]
})