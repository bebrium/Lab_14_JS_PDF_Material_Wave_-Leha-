document.addEventListener('DOMContentLoaded', () => {
    // Редактирование элементов
    const editables = document.querySelectorAll('.editable');
    
    editables.forEach(el => {
        el.setAttribute('contenteditable', 'true');
        el.addEventListener('click', createWaveEffect);
        el.addEventListener('blur', highlightChange);
    });

    // Эффект волны
    function createWaveEffect(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.width = '100px';
        wave.style.height = '100px';
        wave.style.left = `${x - 50}px`;
        wave.style.top = `${y - 50}px`;
        
        this.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 600);
    }

    // Подсветка изменений
    function highlightChange() {
        this.classList.add('highlight');
        setTimeout(() => {
            this.classList.remove('highlight');
        }, 1000);
    }

    // Генерация PDF
    document.getElementById('downloadBtn').addEventListener('click', () => {
        const element = document.getElementById('resume');
        const options = {
            margin: 10,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).save();
    });
});
