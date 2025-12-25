const enterBtn = document.getElementById('enterBtn');
const modal = document.getElementById('worldviewModal');
const closeBtn = document.getElementById('closeModal');
const closeX = document.getElementById('modalCloseX');

    enterBtn?.addEventListener('click', () => {
      modal?.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    });

    const closeModal = () => {
      modal?.classList.remove('active');
      document.body.style.overflow = ''; 
    };

    closeBtn?.addEventListener('click', closeModal);
    closeX?.addEventListener('click', closeModal);

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeModal();
      }
    });