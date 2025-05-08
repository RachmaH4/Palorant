document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMid = document.querySelector('.nav-mid');
    const navRight = document.querySelector('.nav-right');
    const navLeft = document.querySelector('.nav-left');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    function checkResponsive() {
        if (window.innerWidth <= 768) {
            navMid.style.display = 'none';
            navRight.style.display = 'none';
            navLeft.style.width = 'auto';
            navLeft.style.marginRight = 'auto';
            hamburger.style.display = 'block';
        } else {
            navMid.style.display = 'flex';
            navRight.style.display = 'flex';
            navLeft.style.width = '15%';
            navLeft.style.marginRight = '0';
            hamburger.style.display = 'none';
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    }
    
    checkResponsive();

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkResponsive, 200);
    });

    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
});