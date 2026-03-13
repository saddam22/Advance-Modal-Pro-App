//select all modal triggers and modals
const modalButtons = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');


modalButtons.forEach(btn => {
btn.addEventListener('click', () => {
	const modalId = btn.getAttribute('data-modal');
	const modal = document.getElementById('modalId');
	});
});


modals.forEach(modal => {
	//close modal on overlay click
	modal.addEventListener('click', () => {
		if(e.target === modal) closeModal(modal);
	});

	//close buttons
	modal.querySelectorAll('.close, .cancel').forEach(btn =>{
		btn.addEventListener('click', () => closeModal(modal));
	});
});


// Open Modal with animation
function openModal(modal){
	modal.classList.remove('hidden');
	const content = modal.querySelector('div');
	setTimeout(() =>{
		content.classList.add('scale-100');
	}, 10); // small delay for transition
}

// Close Modal with animation
function closeModal(modal){
	const content = modal.querySelector('div');
	content.classList.remove('scale-100');
	setTimeout(() => modal.classList.add('hidden'), 200);
}