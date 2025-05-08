function setUniformNewsImageHeight() {
  const newsImages = document.querySelectorAll('.news-image-container');
  if (newsImages.length > 0) {
    let minHeight = Infinity;
    newsImages.forEach(container => {
      const height = container.clientHeight;
      if (height < minHeight) minHeight = height;
    });
    newsImages.forEach(container => {
      container.style.height = `${minHeight}px`;
    });
  }
}

function setupPagination() {
  const paginationButtons = document.querySelectorAll('.pagination-button');
  paginationButtons.forEach(button => {
    button.addEventListener('click', function() {
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const pageNum = this.textContent;
      if (pageNum !== '...') {
        console.log(`Loading page ${pageNum}`);
      }
    });
  });
}

function initNewsImages() {
  const newsImages = document.querySelectorAll('.news-image');
  newsImages.forEach(img => {
    img.style.objectPosition = 'center top';
    img.parentElement.style.overflow = 'hidden';
  });

  const detailImage = document.querySelector('.news-detail-image');
  if (detailImage) {
    detailImage.style.maxHeight = '100vh';
    detailImage.style.objectFit = 'cover';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setUniformNewsImageHeight();
  initNewsImages();
  setupPagination();

  document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', function() {
      const type = this.classList.contains('facebook') ? 'Facebook' : 
                   this.classList.contains('twitter') ? 'Twitter' : 'Discord';
      alert(`Sharing to ${type} will be implemented soon!`);
    });
  });

  const newsCards = document.querySelectorAll('.news-card');
  newsCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 10px 20px rgba(255, 70, 85, 0.7)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
});