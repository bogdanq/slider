const slider = new Slider({
	slideToShow: 3,
	arrow: true,
	element: document.querySelector('.js_slick'),
	responsive: [
		{
			breakpoint: 768,
			setting: {
				slideToShow: 2,
				arrow: true
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