// rooms.js - Filtering logic and Modal actions

document.addEventListener('DOMContentLoaded', () => {
    // Select filter controls
    const priceSlider = document.getElementById('priceRange');
    const typeFilters = document.querySelectorAll('.type-filter');
    const btnClear = document.getElementById('btnClearFilters');
    
    // Select room cards
    const roomCards = document.querySelectorAll('.room-card');

    // Update Price Label logic
    const priceLabels = document.querySelector('.price-labels');
    if (priceLabels && priceSlider) {
        priceSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            priceLabels.children[1].textContent = `NPR ${eval(val/1000)}k+`;
            filterRooms();
        });
    }

    // Add listeners to checkboxes
    typeFilters.forEach(cb => {
        cb.addEventListener('change', filterRooms);
    });

    // Clear filters
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            priceSlider.value = priceSlider.max;
            priceLabels.children[1].textContent = `NPR 100k+`;
            typeFilters.forEach(cb => cb.checked = true);
            filterRooms();
        });
    }

    function filterRooms() {
        const maxPrice = parseInt(priceSlider.value);
        
        // Gather checked types
        const selectedTypes = [];
        typeFilters.forEach(cb => {
            if (cb.checked) selectedTypes.push(cb.value);
        });

        // Filter cards
        let visibleCount = 0;
        roomCards.forEach(card => {
            const cardPrice = parseInt(card.getAttribute('data-price'));
            const cardType = card.getAttribute('data-type');
            
            if (cardPrice <= maxPrice && selectedTypes.includes(cardType)) {
                card.style.display = 'flex'; // `.room-card` is usually display flex depending on CSS, or block. It's block by default, flex in smaller screens. 
                // Wait, examining global CSS, we'll just set it to empty string to revert to stylesheet default, or 'flex'.
                card.style.display = ''; 
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
    }
});

// Modal Logic
function openModal(title, price, desc, imgSrc) {
    const modal = document.getElementById('roomModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = `NPR ${parseInt(price).toLocaleString()} / NIGHT`;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalImg').src = imgSrc;
    
    // Pre-fill session storage if tracking booked room
    sessionStorage.setItem('selectedRoom', title);
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('roomModal').style.display = 'none';
}

// Close modal when clicking outside the content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('roomModal');
    if (event.target === modal) {
        closeModal();
    }
});
