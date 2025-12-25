const classificationSuggestions = [
  { value: 'DYSTOPIA', label: 'DYSTOPIA', subtitle: 'Anti-utopian archives' },
  { value: 'PHILOSOPHY', label: 'PHILOSOPHY', subtitle: 'Wisdom texts' },
  { value: 'CYBERPUNK', label: 'CYBERPUNK', subtitle: 'Future visions' },
  { value: 'FORBIDDEN', label: 'FORBIDDEN', subtitle: 'Banned literature' },
  { value: 'CLASSIC', label: 'CLASSIC', subtitle: 'Timeless works' },
];

function initClassificationAutocomplete() {
  const input = document.getElementById('classification');
  const dropdown = document.getElementById('classification-dropdown');

  if (!input || !dropdown) return;

  function renderOptions(filter = '') {
    const filtered = filter 
      ? classificationSuggestions.filter(item => 
          item.label.toLowerCase().includes(filter.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(filter.toLowerCase())
        )
      : classificationSuggestions;

    if (filtered.length === 0) {
      dropdown.classList.add('hidden');
      return;
    }

    dropdown.innerHTML = filtered.map(item => `
      <div class="classification-option px-4 py-3 cursor-pointer font-mono text-sm text-text hover:bg-primary hover:text-background border-b border-neutral/30 last:border-0 transition-colors" data-value="${item.value}">
        <span class="text-secondary mr-2"> > </span>
        <span class="option-label">${item.label}</span>
        <span class="text-neutral text-xs ml-2">- ${item.subtitle}</span>
      </div>
    `).join('');

    dropdown.classList.remove('hidden');

    dropdown.querySelectorAll('.classification-option').forEach(option => {
      option.addEventListener('click', () => {
        const label = option.querySelector('.option-label')?.textContent || '';
        input.value = label;
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
    if (!document.getElementById('classification-auto')?.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  input.addEventListener('keydown', (e) => {
    const options = dropdown.querySelectorAll('.classification-option');
    const activeOption = dropdown.querySelector('.classification-option.active');
    
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
      const label = activeOption.querySelector('.option-label')?.textContent || '';
      input.value = label;
      dropdown.classList.add('hidden');
    } else if (e.key === 'Escape') {
      dropdown.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', initClassificationAutocomplete);