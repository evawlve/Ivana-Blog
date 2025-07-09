// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) return; // Exit if form doesn't exist
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = contactForm.querySelector('.submit-button');
  
  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const namePattern = /^[a-zA-Z\s]{2,50}$/;
  
  // Error message container
  let errorContainer = null;
  
  // Create error container
  function createErrorContainer() {
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.className = 'form-errors';
      errorContainer.style.cssText = `
        background-color: #fee;
        border: 1px solid #fcc;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 15px;
        color: #c33;
        font-size: 0.9em;
      `;
      contactForm.insertBefore(errorContainer, contactForm.firstChild);
    }
  }
  
  // Show error message
  function showError(message) {
    createErrorContainer();
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }
  
  // Clear error message
  function clearError() {
    if (errorContainer) {
      errorContainer.style.display = 'none';
    }
  }
  
  // Validate name
  function validateName(name) {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (name.trim().length > 50) {
      return 'Name must be less than 50 characters';
    }
    if (!namePattern.test(name.trim())) {
      return 'Name can only contain letters and spaces';
    }
    return null;
  }
  
  // Validate email
  function validateEmail(email) {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailPattern.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return null;
  }
  
  // Validate message
  function validateMessage(message) {
    if (!message.trim()) {
      return 'Message is required';
    }
    if (message.trim().length < 10) {
      return 'Message must be at least 10 characters long';
    }
    if (message.trim().length > 1000) {
      return 'Message must be less than 1000 characters';
    }
    return null;
  }
  
  // Real-time validation
  function addRealTimeValidation(input, validator) {
    input.addEventListener('blur', function() {
      const error = validator(this.value);
      const formGroup = this.closest('.form-group');
      const existingError = formGroup.querySelector('.field-error');
      
      if (existingError) {
        existingError.remove();
      }
      
      if (error) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = error;
        errorElement.style.cssText = `
          color: #c33;
          font-size: 0.8em;
          margin-top: 5px;
        `;
        formGroup.appendChild(errorElement);
        this.style.borderColor = '#c33';
      } else {
        this.style.borderColor = '#4CAF50';
      }
    });
    
    input.addEventListener('input', function() {
      const formGroup = this.closest('.form-group');
      const existingError = formGroup.querySelector('.field-error');
      
      if (existingError) {
        existingError.remove();
      }
      
      if (this.value.trim()) {
        this.style.borderColor = '#4CAF50';
      } else {
        this.style.borderColor = '';
      }
    });
  }
  
  // Add real-time validation to all fields
  addRealTimeValidation(nameInput, validateName);
  addRealTimeValidation(emailInput, validateEmail);
  addRealTimeValidation(messageInput, validateMessage);
  
  // Form submission validation
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearError();
    
    // Remove all field errors
    const fieldErrors = contactForm.querySelectorAll('.field-error');
    fieldErrors.forEach(error => error.remove());
    
    // Reset border colors
    [nameInput, emailInput, messageInput].forEach(input => {
      input.style.borderColor = '';
    });
    
    // Validate all fields
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const messageError = validateMessage(messageInput.value);
    
    // Collect all errors
    const errors = [];
    if (nameError) {
      errors.push(nameError);
      nameInput.style.borderColor = '#c33';
    }
    if (emailError) {
      errors.push(emailError);
      emailInput.style.borderColor = '#c33';
    }
    if (messageError) {
      errors.push(messageError);
      messageInput.style.borderColor = '#c33';
    }
    
    // If there are errors, show them and stop submission
    if (errors.length > 0) {
      showError('Please fix the following errors:\n' + errors.join('\n'));
      return false;
    }
    
    // If validation passes, submit the form
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Submit the form
    contactForm.submit();
  });
  
  // Reset form on page load
  function resetForm() {
    contactForm.reset();
    clearError();
    const fieldErrors = contactForm.querySelectorAll('.field-error');
    fieldErrors.forEach(error => error.remove());
    [nameInput, emailInput, messageInput].forEach(input => {
      input.style.borderColor = '';
    });
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
  
  // Reset form when page loads
  resetForm();
}); 