document.addEventListener('DOMContentLoaded', function() {
	const slider = document.querySelector('.slider');
	const dots = document.querySelectorAll('.dot');
	const slides = document.querySelectorAll('.slide');
	let currentSlide = 0;
	let interval;
	let isAutoPlaying = true;
	
	function goToSlide(n) {
		currentSlide = (n + slides.length) % slides.length;
		slider.style.transform = `translateX(-${currentSlide * 100}%)`;
		
		dots.forEach(dot => {
			dot.classList.remove('active');
			dot.style.setProperty('--progress', '0');
		});
		dots[currentSlide].classList.add('active');
		
		if (isAutoPlaying) {
			resetProgressAnimation();
		}
	}
	
	function startAutoSlide() {
		isAutoPlaying = true;
		clearInterval(interval);
		resetProgressAnimation();
		interval = setInterval(() => {
			goToSlide(currentSlide + 1);
		}, 3000);
	}
	
	function resetProgressAnimation() {
		dots.forEach(dot => {
			dot.style.setProperty('--progress', '0');
			setTimeout(() => {
				dot.style.setProperty('--progress', '1');
			}, 10);
		});
	}
	
	dots.forEach(dot => {
		dot.addEventListener('click', function() {
			clearInterval(interval);
			isAutoPlaying = false;
			goToSlide(parseInt(this.dataset.slide));
			setTimeout(startAutoSlide, 10000);  
		});
		
		dot.style.setProperty('--progress', '1');
	});
	
	document.addEventListener('keydown', function(e) {
		clearInterval(interval);
		isAutoPlaying = false;
		
		if (e.key === 'ArrowLeft') {
			goToSlide(currentSlide - 1);
		} else if (e.key === 'ArrowRight') {
			goToSlide(currentSlide + 1);
		}
		
		setTimeout(startAutoSlide, 10000); 
	});
	
	slider.addEventListener('mouseenter', () => {
		clearInterval(interval);
		isAutoPlaying = false;
	});
	
	slider.addEventListener('mouseleave', startAutoSlide);
	
	window.addEventListener('resize', function() {
		slider.style.transition = 'none';
		goToSlide(currentSlide);
		setTimeout(() => {
			slider.style.transition = 'transform 0.5s ease';
		}, 10);
	});
	
	startAutoSlide();
});