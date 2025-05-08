document.addEventListener('DOMContentLoaded', function() {
    const galleryData = [
        { img: '../Assets/Image/Maps/Abyss/1.avif', caption: 'Teleporter Alpha Entrance' },
        { img: '../Assets/Image/Maps/Abyss/2.avif', caption: 'Mid Control Point' },
        { img: '../Assets/Image/Maps/Abyss/3.avif', caption: 'Site A Overview' },
        { img: '../Assets/Image/Maps/Abyss/4.avif', caption: 'Teleporter Bravo Exit' },
        { img: '../Assets/Image/Maps/Abyss/5.avif', caption: 'Site B Choke Point' },
        { img: '../Assets/Image/Maps/Abyss/6.avif', caption: 'Vertical Combat Zone' },
        { img: '../Assets/Image/Maps/Abyss/7.avif', caption: 'Sniper Nest' },
        { img: '../Assets/Image/Maps/Abyss/8.avif', caption: 'Utility Setup Area' },
        { img: '../Assets/Image/Maps/Abyss/minimap.avif', caption: 'Tactical Minimap' }
    ];

    const galleryScroll = document.querySelector('.gallery-scroll');
    const dotsContainer = document.querySelector('.gallery-dots');
    const galleryContainer = document.querySelector('.gallery-container');

    galleryData.forEach((item, index) => {

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.caption;
        img.draggable = false;
        
        const caption = document.createElement('div');
        caption.className = 'img-caption';
        caption.textContent = item.caption;
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(caption);
        galleryScroll.appendChild(galleryItem);
        
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToIndex(index));
        dotsContainer.appendChild(dot);
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.gallery-dots .dot');
    const prevBtn = document.querySelector('.scroll-btn.left');
    const nextBtn = document.querySelector('.scroll-btn.right');
    
    let currentIndex = 0;
    const itemWidth = galleryItems[0].offsetWidth + parseInt(getComputedStyle(galleryScroll).gap);
    
    let isDragging = false;
    let startPosX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let holdTimer;
    let isHolding = false;
    let autoScrollInterval;
    
    function scrollToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, galleryItems.length - 1));
        galleryScroll.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });
        updateDots();
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    prevBtn.addEventListener('click', () => {
        scrollToIndex(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        scrollToIndex(currentIndex + 1);
    });
    
    galleryScroll.addEventListener('scroll', () => {
        const scrollPos = galleryScroll.scrollLeft;
        currentIndex = Math.round(scrollPos / itemWidth);
        updateDots();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            scrollToIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            scrollToIndex(currentIndex + 1);
        }
    });
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % galleryItems.length;
            scrollToIndex(nextIndex);
        }, 5000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    startAutoScroll();
    updateDots();

    function startHoldScroll(direction) {
        stopAutoScroll();
        isHolding = true;
        holdTimer = setInterval(() => {
            const newIndex = currentIndex + direction;
            if (newIndex >= 0 && newIndex < galleryItems.length) {
                scrollToIndex(newIndex);
            } else {
                clearInterval(holdTimer);
                isHolding = false;
                startAutoScroll();
            }
        }, 300);
    }
    
    galleryItems.forEach(item => {
        item.addEventListener('dragstart', (e) => e.preventDefault());
        
        item.addEventListener('touchstart', touchStart);
        item.addEventListener('touchend', touchEnd);
        item.addEventListener('touchmove', touchMove);
    });
    
    galleryContainer.addEventListener('mousedown', mouseDown);
    galleryContainer.addEventListener('mouseup', mouseUp);
    galleryContainer.addEventListener('mouseleave', mouseLeave);
    galleryContainer.addEventListener('mousemove', mouseMove);
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function mouseDown(e) {
        isDragging = true;
        startPosX = getPositionX(e);
        prevTranslate = currentTranslate;
        
        isHolding = false;
        holdTimer = setTimeout(() => {
            isHolding = true;
            const rect = galleryContainer.getBoundingClientRect();
            const center = rect.width / 2;
            const clickPos = e.clientX - rect.left;
            
            const direction = clickPos < center ? -1 : 1;
            startHoldScroll(direction);
        }, 500);
    }
    
    function mouseMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        if (isHolding) return;
        
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPosX;
        
        galleryScroll.scrollLeft = prevTranslate - diff;
    }
    
    function touchMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPosX;
        galleryScroll.scrollLeft = prevTranslate - diff;
    }
    
    function mouseUp() {
        if (isHolding) {
            clearInterval(holdTimer);
            isHolding = false;
            startAutoScroll();
        }
        isDragging = false;
        clearTimeout(holdTimer);
    }
    
    function mouseLeave() {
        if (isHolding) {
            clearInterval(holdTimer);
            isHolding = false;
            startAutoScroll();
        }
        isDragging = false;
    }
    
    function touchStart(e) {
        isDragging = true;
        startPosX = getPositionX(e);
        prevTranslate = currentTranslate;
    }
    
    function touchMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPosX;

    }
    
    function touchEnd() {
        isDragging = false;
    }
    
    galleryContainer.addEventListener('mouseenter', stopAutoScroll);
    galleryContainer.addEventListener('mouseleave', () => {
        if (!isHolding) startAutoScroll();
    });
    
    window.addEventListener('blur', stopAutoScroll);
    window.addEventListener('focus', startAutoScroll);
    
    function handleResize() {
        const newItemWidth = galleryItems[0].offsetWidth + parseInt(getComputedStyle(galleryScroll).gap);
        scrollToIndex(currentIndex);
    }

    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .map-gallery').forEach(section => {
        observer.observe(section);
    });
});