document.addEventListener('DOMContentLoaded', function() {
    // MOBILE NAVIGATION SYSTEM
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('mobile-active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // PORTFOLIO FILTER SYSTEM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.filter-item');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // AUTO-POPULATE INTENT FROM URL PARAMS
    const urlParams = new URLSearchParams(window.location.search);
    const intentParam = urlParams.get('intent');
    const formIntent = document.getElementById('form-intent');
    const uploadWrapper = document.getElementById('upload-wrapper');
    if (formIntent && intentParam) {
        formIntent.value = intentParam;
        if (intentParam === 'career' && uploadWrapper) {
            uploadWrapper.style.display = 'block';
        }
    }

    // INTERACTIVE FORM UPLOADER TOGGLE
    if (formIntent && uploadWrapper) {
        formIntent.addEventListener('change', (e) => {
            if (e.target.value === 'career') {
                uploadWrapper.style.display = 'block';
                document.getElementById('form-file').setAttribute('required', 'required');
            } else {
                uploadWrapper.style.display = 'none';
                document.getElementById('form-file').removeAttribute('required');
            }
        });
    }

    // FORM ACCESSIBILITY SECURITY VALIDATION
    const contactForm = document.getElementById('intake-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const errorBox = document.getElementById('form-error-msg');
            const successBox = document.getElementById('form-success-msg');
            const fileInput = document.getElementById('form-file');
            
            errorBox.style.display = 'none';
            successBox.style.display = 'none';

            if (formIntent.value === 'career' && fileInput.files.length > 0) {
                const uploadedFile = fileInput.files[0];
                if (uploadedFile.type !== "application/pdf") {
                    errorBox.innerText = "Security Halt: Only valid PDF documents are approved.";
                    errorBox.style.display = 'block';
                    return;
                }
                if (uploadedFile.size > 5 * 1024 * 1024) {
                    errorBox.innerText = "Payload Blocked: Attached file cannot exceed 5MB boundaries.";
                    errorBox.style.display = 'block';
                    return;
                }
            }
            successBox.style.display = 'block';
            contactForm.reset();
            if (uploadWrapper) uploadWrapper.style.display = 'none';
        });
    }
});

function openLightbox(imageSrc, captionText) {
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const modalCaption = document.getElementById("lightboxCaption");

  modal.style.display = "flex";    // Show the window
  modalImg.src = imageSrc;         // Pass the image path
  modalCaption.textContent = captionText; // Pass the caption text
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  modal.style.display = "none";    // Hide the window
}

// Optional: Close the window if the user clicks anywhere outside the image
window.onclick = function(event) {
  const modal = document.getElementById("lightboxModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
