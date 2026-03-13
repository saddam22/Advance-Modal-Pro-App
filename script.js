//select all modal triggers and modals
const modalButtons = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const dynamicModalContent = document.getElementById('dynamicContent');

modalButtons.forEach(btn => {
btn.addEventListener('click', () => {
	const modalId = btn.getAttribute('data-modal');
	const modal = document.getElementById(modalId);


	// If dynamic modal, inject content
	if(modalId === 'modal3'){
		dynamicModalContent.innerHTML = `
		<h2 class="text-xl font-semibold mb-4">Dynamic Modal Content</h2>
        <p class="mb-4">This content was dynamically injected using JavaScript. You can fetch API data here.</p>
		`;
	}
	openModal(modal);
	});
});

// Open Modal with animation
function openModal(modal){
	modal.classList.remove('hidden');
	const content = modal.querySelector('.modal-content');
	setTimeout(() => content.classList.add('scale-100'), 10); 


	//Trap focus inside modal
	trapFocus(modal);
}

// Close Modal
function closeModal(modal){
	const content = modal.querySelector('.modal-content');
	content.classList.remove('scale-100');
	setTimeout(() => modal.classList.add('hidden'), 200);
}

modals.forEach(modal => {
	//close modal on overlay click
	modal.addEventListener('click', (e) => {
		if(e.target === modal) closeModal(modal);
			modal.querySelectorAll('.close, .cancel, .confirm').forEach(btn =>{
		btn.addEventListener('click', () => closeModal(modal));
		});
	});
});


//close modal via ESC key
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		modals.forEach(modal => {
			if (!modal.classList.contains('hidden')) closeModal(modal);
		});
	}
});


//Focus trap function
function trapFocus(modal){
	const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not ([tabindex="-1"])');
	const firstE1 = focusableElements[0];
	const lastE1 = focusableElements[focusableElements.length -1];

	firstE1.focus();
	modal.addEventListener('keydown', (e) => {
		if(e.key === 'Tab'){
			if(e.shiftKey){
				if(document.activeElement === firstE1){e.preventDefault(); lastE1.focus(); }
			}else{
				if (document.activeElement === lastE1) { e.preventDefault(); firstE1.focus(); }
			}
		}
	});
}