const bookSuggestions = [
  'Fahrenheit 451 - Ray Bradbury',
  '1984 - George Orwell',
  'Brave New World - Aldous Huxley',
  'Snow Crash - Neal Stephenson',
  "Neuromancer - William Gibson",
  'Do Androids Dream of Electric Sheep? - Philip K. Dick',
  'Flatland: A Romance of Many Dimensions - Edwin A. Abbott',
  'To Kill a Mockingbird - Harper Lee',
  'Pride and Prejudice - Jane Austen',
  'Siddhartha - Hermann Hesse',
  'The Myth of Sisyphus - Albert Camus',
  'Tao Te Ching - Lao Tzu',
  'A Clockwork Orange - Anthony Burgess',
  'Ulysses - James Joyce',
  'Slaughterhouse-Five - Kurt Vonnegut',

];

function initBookAutocomplete() {
  const input = document.getElementById('assigned_book');
  const dropdown = document.getElementById('book-dropdown');

  if (!input || !dropdown) return;

  function renderOptions(filter = '') {
    const filtered = filter 
      ? bookSuggestions.filter(book => 
          book.toLowerCase().includes(filter.toLowerCase())
        )
      : bookSuggestions;

    if (filtered.length === 0) {
      dropdown.classList.add('hidden');
      return;
    }

    dropdown.innerHTML = filtered.map(book => `
      <div class="book-option px-4 py-3 cursor-pointer font-mono text-sm text-text hover:bg-primary hover:text-background border-b border-neutral/30 last:border-0 transition-colors">
        <span class="text-secondary mr-2">›</span>${book}
      </div>
    `).join('');

    dropdown.classList.remove('hidden');

    dropdown.querySelectorAll('.book-option').forEach(option => {
      option.addEventListener('click', () => {
        input.value = option.textContent?.replace('›', '').trim() || '';
        dropdown.classList.add('hidden');
      });
    });
  }

  input.addEventListener('focus', () => {
    renderOptions(input.value);
  });

  input.addEventListener('input', () => {
    renderOptions(input.value);
  });

  document.addEventListener('click', (e) => {
    if (!document.getElementById('book-auto')?.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  input.addEventListener('keydown', (e) => {
    const options = dropdown.querySelectorAll('.book-option');
    const activeOption = dropdown.querySelector('.book-option.active');
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!activeOption) {
        options[0]?.classList.add('active', 'bg-primary', 'text-background');
      } else {
        activeOption.classList.remove('active', 'bg-primary', 'text-background');
        const next = activeOption.nextElementSibling || options[0];
        next?.classList.add('active', 'bg-primary', 'text-background');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeOption) {
        activeOption.classList.remove('active', 'bg-primary', 'text-background');
        const prev = activeOption.previousElementSibling || options[options.length - 1];
        prev?.classList.add('active', 'bg-primary', 'text-background');
      }
    } else if (e.key === 'Enter' && activeOption) {
      e.preventDefault();
      input.value = activeOption.textContent?.replace('›', '').trim() || '';
      dropdown.classList.add('hidden');
    } else if (e.key === 'Escape') {
      dropdown.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', initBookAutocomplete);