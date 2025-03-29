 document.addEventListener('DOMContentLoaded', function() {
	const menuToggle = document.querySelector('.menu-toggle');
	const menu = document.querySelector('.menu');
	const menuItems = document.querySelectorAll('.menu > li');
	
	menuToggle.addEventListener('click', function() {
		this.classList.toggle('active');
		menu.classList.toggle('active');
	});
	
	if (window.innerWidth <= 768) {
		menuItems.forEach(item => {
			const link = item.querySelector('a');
			const submenu = item.querySelector('.submenu');
			
			if (submenu) {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					item.classList.toggle('active');
				});
			}
		});
	}
});