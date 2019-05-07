const arr = [
	{
		text: '<',
		className: 'btn prev'
	},
	{
		text: '>',
		className: 'btn next'
	}
]

class Slider {
	constructor(setting) {
    this.wrapper = setting.element
		this.item = this.wrapper.querySelectorAll('.js_item')
		this.setting = setting
		this.currentSlide = 0
		this.step = 0
    
		this.init()
	}

	init = () => {
		this.setting.responsive.map(item => {
			this.arrow = this.setting.arrow

			if(document.documentElement.clientWidth < item.breakpoint) {
				this.setting.slideToShow = item.setting.slideToShow
				this.maxCurrentSlide = this.item.length - item.setting.slideToShow
				this.arrow = item.setting.arrow || true
			}

			this.maxCurrentSlide = this.item.length - this.setting.slideToShow
		})
		
		this.render()
	}

	render = () => {
		let actionBtn = document.createElement('div')
		this.wrapper.parentNode.insertBefore(actionBtn, this.wrapper.nextSibling)
		actionBtn.className = 'actionBtn'

		arr.map(item => {
			let btn = document.createElement('button')
			btn.innerHTML = item.text
			btn.className = item.className
			actionBtn.appendChild(btn)
		})

		this.createEvent()
	}

	createEvent = () => {
		this.buttons = this.wrapper.parentNode.querySelectorAll('.btn')
		
		for(let i = 0; i < this.buttons.length; i++) {
			this.buttons[i].addEventListener('click', (e) => {
				e.target.className == 'btn next'
				? this.onClickNext()
				: this.onClickPrev()
			})
		}

		this.getSlideToShow()
	}

	getSlideToShow = () => {
		for(let i = 0; i < this.item.length; i++) {
			this.item[i].style.flex = `0 0 ${Math.floor(100/this.setting.slideToShow)}%`
		}

		this.step = this.item[0].clientWidth
		this.arrow && this.createDots()
	}

	onClickNext = () => {	
		++this.currentSlide
		
		if (this.currentSlide > this.maxCurrentSlide) {
			this.currentSlide = 0
		}

		this.onTransformSlide()
	}

	onClickPrev = () => {
		--this.currentSlide

		if (this.currentSlide < 0) {
			this.currentSlide = this.maxCurrentSlide
		}

		this.onTransformSlide()
	}

	onTransformSlide = () => {
		this.wrapper.style["transform"] = `translateX(-${this.currentSlide * this.step}px)`
		this.arrow && this.getActiveDots()
	}

	createDots = () => {
		for (let i = 0; i <= this.maxCurrentSlide; i++) {
			let parent = this.wrapper.parentNode.querySelector('.prev')
			let btn = document.createElement('div')
			btn.className = 'dots active'
			parent.parentNode.insertBefore(btn, parent.nextSibling)
		}

		this.getActiveDots()
	}

	getActiveDots = () => {
		this.dots = this.wrapper.parentNode.querySelectorAll('.dots')
		for(let i = 0; i <= this.maxCurrentSlide; i++) {
			this.dots[i].classList.remove('active')
		}

		this.dots[this.currentSlide].classList.add('active')

		this.onClickDots()
	}

	onClickDots = () => {
		for(let i = 0; i <= this.maxCurrentSlide; i++) {
			this.dots[i].addEventListener('click', () => {
				this.currentSlide = i
				this.onTransformSlide()
			})
		}
	}
}