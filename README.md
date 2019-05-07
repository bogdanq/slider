## Infinite Slider

this slider has some setting

```javascript
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
```

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
showDots | boolean | false | Current slide indicator dots
slideToShow | number | 1 |  of slides to show at a time
slideToScroll | number | 1 |  of slides to scroll at a time
speed | number | 500 |  the scroll speed