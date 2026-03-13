//Yheme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});

//select all modal triggers and modals
const modalButtons = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const dynamicContent = document.getElementById('dynamicContent');

modalButtons.forEach(btn => {
btn.addEventListener('click', () => {
	const modalId = btn.getAttribute('data-modal');
	const modal = document.getElementById(modalId);


	// Load API data for modal 3
	if(modalId === 'modal3'){
		fetch('https://jsonplaceholder.typicode.com/posts/1')
		.then(res => res.json())
		.then(data => {
			dynamicContent.innerHTML = `
		<h2 class="text-xl font-semibold mb-4 text-black dark:text-white">${data.title}</h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">${data.body}</p>
		`;
		});	
	}
	openModal(modal);
	});
});

// Open Modal with animation
function openModal(modal){
	modal.classList.remove('hidden');
	const content = modal.querySelector('.modal-content');
	setTimeout(() => content.classList.add('scale-100'), 10); 
	trapFocus(modal);
}

// Close Modal
function closeModal(modal){
	const content = modal.querySelector('.modal-content');
	content.classList.remove('scale-100');
	setTimeout(() => modal.classList.add('hidden'), 200);
}

// Close via overlay / close / cancel buttons
modals.forEach(modal => {
	modal.addEventListener('click', (e) => {
		if(e.target === modal) closeModal(modal);
	});
	//close buttons
			modal.querySelectorAll('.close, .cancel').forEach(btn =>{
		btn.addEventListener('click', () => closeModal(modal));

	});

	//confirm buttons
	modal.querySelectorAll('.confirm').forEach(btn => {
		btn.addEventListener('click', () => {
			alert("Confirmed!");
			closeModal(modal);
		});
	});

});


//close modal via ESC key
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		modals.forEach(m => {
			if (!m.classList.contains('hidden')) closeModal(m);
		});
	}
});


//Focus trap function
function trapFocus(modal){
	const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

	const firstEl = focusableElements[0];
	const lastEl = focusableElements[focusableElements.length -1];

	firstEl.focus();
	modal.addEventListener('keydown', (e) => {
		if(e.key === 'Tab'){
			if(e.shiftKey){
				if(document.activeElement === firstEl){e.preventDefault(); lastEl.focus(); }
			}else{
				if(document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
			}
		}
	});
}