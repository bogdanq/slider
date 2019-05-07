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
		this.translationComplete = true
		this.activeDots = 0
		this.countDots = 0

		this.init()
	}

	init = () => {
		this.setting.responsive.map(item => {

			if (document.documentElement.clientWidth < item.breakpoint) {
				this.setting.slideToShow = item.setting.slideToShow || 1
				this.maxCurrentSlide = this.item.length - item.setting.slideToShow || 0
				this.setting.slideToScroll = item.setting.slideToScroll || 1
				this.setting.speed = item.setting.speed || 500
				this.setting.showDots = item.setting.arrow || true
			} else {
				this.setting.slideToShow = this.setting.slideToShow || 1
				this.maxCurrentSlide = this.item.length - this.setting.slideToShow || 0
				this.setting.slideToScroll = this.setting.slideToScroll || 1
				this.setting.speed = this.setting.speed || 500
				this.setting.showDots = this.setting.showDots || false
			}

			this.maxCurrentSlide = this.item.length - (this.setting.slideToScroll + 1)
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

		for (let i = 0; i < this.buttons.length; i++) {
			this.buttons[i].addEventListener('click', (e) => {
				this.onChangeSlide(e.target.className == 'btn next')
			})
		}

		this.getSlideToShow()
	}

	getSlideToShow = () => {
		for (let i = 0; i < this.item.length; i++) {
			this.item[i].style.flex = `0 0 ${Math.floor(100 / this.setting.slideToShow)}%`	
		}

		this.step = this.item[0].clientWidth
		this.setting.showDots && this.createDots()
		this.insertAfterCloneElements()
		this.insertBeforeCloneElements()
	}

	onChangeSlide = (direction) => {
		if (this.translationComplete) {
			this.translationComplete = false
			this.onTransformSlide(direction)
		}
		this.setting.showDots && this.getActiveDots()
	}

	onTransformSlide = (direction) => {
		let shift = direction ? -1 : 1
		this.checkActiveDots(direction)
		
		const start = this.currentSlide * this.step * -1
		const end = start + ((this.setting.slideToScroll * this.step) * shift)
	
		this.animate(start, end, this.setting.speed, 60,
			(position) => {
				this.wrapper.style["transform"] = `translateX(${position}px)`
			},
			() => {
				this.currentSlide = this.currentSlide + this.setting.slideToScroll * shift * -1
					this.transitionCompleted()
				if (this.currentSlide > this.maxCurrentSlide + this.setting.slideToShow + this.setting.slideToScroll) {
						this.setStartPosition()
					} else if (this.currentSlide == 0) {
						this.setEndPosition()
					}
			})
	}

	defaultPositionSlide = () => {
		this.wrapper.style["transform"] = `translateX(${this.currentSlide * -this.step}px)`
		this.setting.showDots && this.getActiveDots()
	}

	createDots = () => {
		this.countDots = Math.ceil((this.item.length - this.setting.slideToShow ) / this.setting.slideToScroll)

		for (let i = 0; i <= this.countDots; i++) {
			let parent = this.wrapper.parentNode.querySelector('.prev')
			let btn = document.createElement('div')
			btn.className = 'dots'
			parent.parentNode.insertBefore(btn, parent.nextSibling)
		}

		this.setting.showDots && this.getActiveDots()
	}

	getActiveDots = () => {
		this.dots = this.wrapper.parentNode.querySelectorAll('.dots')
		for (let i = 0; i <= this.countDots; i++) {
			this.dots[i].classList.remove('active')
		}

		this.dots[this.activeDots].classList.add('active')
	}

	checkActiveDots = (direction) => {
		if(direction) {
			this.activeDots >= this.countDots
				? this.activeDots = 0 
				: this.activeDots = this.activeDots + 1
		} else {
			this.activeDots <= 0 
				? this.activeDots = this.countDots
				: this.activeDots = this.activeDots - 1
		}
	}

	transitionCompleted = () => {
		this.translationComplete = true
	}

	insertAfterCloneElements = () => {
		for (let i = 0; i < this.setting.slideToShow; i++) {
			this.wrapper.appendChild(this.item[i].cloneNode({ deep: true }))
		}
	}

	insertBeforeCloneElements = () => {
		this.setStartPosition()
		this.countCloneElements = this.item.length - this.setting.slideToShow
		const firstChild = this.wrapper.firstChild
		for (let i = this.countCloneElements; i < this.item.length; i++) {
			this.wrapper.insertBefore(this.item[i].cloneNode({ deep: true }), firstChild)
		}
	}

	setStartPosition = () => {
		this.currentSlide = this.setting.slideToShow
		this.defaultPositionSlide()
	}

	setEndPosition = () => {
		this.currentSlide = this.item.length
		this.defaultPositionSlide()
	}

	animate = (start, finish, time, fps, frame, callback) => {
		let result = start
		let count = 0

		const timer = setInterval(function () {
			if (count >= time) {
				clearInterval(timer)
				callback()
			} else {
				result = result + (finish - start) / (time / 1000 * fps)
				count = count + 1000 / fps
				frame(result)
			}
		}, 1000 / fps)
	}
}