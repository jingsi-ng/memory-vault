console.log('Script loaded!');
    
    const enterBtn = document.getElementById('enterBtn');
    const modal = document.getElementById('worldviewModal');
    const closeBtn = document.getElementById('closeModal');
    const closeX = document.getElementById('modalClose');

    console.log('enterBtn:', enterBtn);
    console.log('modal:', modal);
    console.log('closeBtn:', closeBtn);
    console.log('closeX:', closeX);

    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        console.log('Enter button clicked!');
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
          console.log('Modal opened!');
        } else {
          console.error('Modal not found!');
        }
      });
    } else {
      console.error('Enter button not found!');
    }

    const closeModal = () => {
      console.log('Closing modal...');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Modal closed!');
      }
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (closeX) {
      closeX.addEventListener('click', closeModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeModal();
      }
    });

    console.log('All event listeners attached!');