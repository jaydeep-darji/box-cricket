const menuOpenButton = document.querySelector ("#menu-open-button");
const menuCloseButton = document.querySelector ("#menu-close-button");

menuOpenButton.addEventListener("click",() =>{
    //toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

//close menu the mobile show
menuCloseButton.addEventListener("click",() => menuOpenButton.click());

// Payment System Functions
function handleDurationChange() {
    updatePrice();
    generateTimeSlots();
}

function updatePrice() {
    const duration = document.getElementById('duration').value;
    const amountField = document.getElementById('amount');
    amountField.value = {1: '₹400', 2: '₹700', 3: '₹900'}[duration] || '';
}

function generateTimeSlots() {
    const duration = parseInt(document.getElementById('duration').value);
    const timeSlotSelect = document.getElementById('timeSlot');
    timeSlotSelect.innerHTML = '<option value="">Select Time Slot</option>';

    if (!duration) return;

    let startHour = 10;
    const endLimit = 24;

    while (startHour + duration <= endLimit) {
        const endHour = startHour + duration;
        const option = document.createElement('option');
        option.value = `${formatHour(startHour)}-${formatHour(endHour)}`;
        option.textContent = `${formatHour(startHour)} - ${formatHour(endHour)}`;
        timeSlotSelect.appendChild(option);
        startHour += duration;
    }
}

function formatHour(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    let formattedHour = hour % 12 || 12;
    return `${formattedHour}${period}`;
}

function processPayment(event) {
    event.preventDefault();
    alert('Redirecting to payment gateway...');
    // Add actual payment processing logic here
}
// Add event listener to About Us link
document.querySelector('a[href="#about"]').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    
    // Get the about section
    const aboutSection = document.getElementById('about');
    
    // Scroll to the section smoothly
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });
document.querySelector('a[href="#Book"]').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    
    // Get the about section
    const aboutSection = document.getElementById('Book');
    
    // Scroll to the section smoothly
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });
  // Load time slots on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initial setup
    updateTimeSlots();
    setupPaymentMethodToggle();
    setupCardTypeToggle();
    setupFormValidation();
    
    // Set up form submission
    document.getElementById('bookingForm').addEventListener('submit', processPayment);
});

// Handle duration change
function handleDurationChange() {
    calculateAmount();
    updateTimeSlots();
}

// Calculate amount based on duration
function calculateAmount() {
    const duration = document.getElementById('duration').value;
    let amount = 0;
    
    switch(duration) {
        case '1':
            amount = 400;
            break;
        case '2':
            amount = 700;
            break;
        case '3':
            amount = 900;
            break;
        default:
            amount = 0;
    }
    
    document.getElementById('amount').value = '₹' + amount.toFixed(2);
}

// Update time slots based on duration
function updateTimeSlots() {
    const duration = document.getElementById('duration').value;
    const timeSlotSelect = document.getElementById('timeSlot');
    
    // Clear existing options
    timeSlotSelect.innerHTML = '<option value="">Select Time Slot</option>';
    
    // If no duration is selected, return
    if (!duration) return;
    
    // Get current date
    const now = new Date();
    const currentHour = now.getHours();
    
    // Create time slots (9 AM to 9 PM)
    for(let hour = 9; hour <= 20; hour++) {
        // Skip past hours for today
        if (hour <= currentHour) continue;
        
        // Check if there's enough time before closing (9 PM)
        if (parseInt(duration) + hour > 21) continue;
        
        const startTime = formatTime(hour);
        const endTime = formatTime(hour + parseInt(duration));
        
        const option = document.createElement('option');
        option.value = `${startTime}-${endTime}`;
        option.textContent = `${startTime} - ${endTime}`;
        
        timeSlotSelect.appendChild(option);
    }
}

// Format time in 12-hour format
function formatTime(hour) {
    const hourIn12Format = hour % 12 || 12;
    const amPm = hour >= 12 ? 'PM' : 'AM';
    return `${hourIn12Format}:00 ${amPm}`;
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const onlinePayment = document.getElementById('online');
    const offlinePayment = document.getElementById('offline');
    const onlinePaymentDetails = document.getElementById('onlinePaymentDetails');
    const payButton = document.getElementById('payButton');
    
    onlinePayment.addEventListener('change', function() {
        if(this.checked) {
            onlinePaymentDetails.style.display = 'block';
            payButton.textContent = 'Proceed to Pay';
        }
    });
    
    offlinePayment.addEventListener('change', function() {
        if(this.checked) {
            onlinePaymentDetails.style.display = 'none';
            payButton.textContent = 'Book Now';
        }
    });
}

// Setup card type toggle
function setupCardTypeToggle() {
    const creditCard = document.getElementById('credit');
    const debitCard = document.getElementById('debit');
    const upi = document.getElementById('upi');
    const cardDetails = document.getElementById('cardDetails');
    const upiDetails = document.getElementById('upiDetails');
    
    creditCard.addEventListener('change', togglePaymentFields);
    debitCard.addEventListener('change', togglePaymentFields);
    upi.addEventListener('change', togglePaymentFields);
    
    function togglePaymentFields() {
        if(creditCard.checked || debitCard.checked) {
            cardDetails.style.display = 'block';
            upiDetails.style.display = 'none';
        } else if(upi.checked) {
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'block';
        }
    }
}

// Setup form validation
function setupFormValidation() {
    // Card number input - numbers only
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^\d]/g, '');
    });
    
    // Expiry date input - format as MM/YY
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^\d]/g, '');
        
        if(this.value.length > 2) {
            this.value = this.value.substring(0, 2) + '/' + this.value.substring(2, 4);
        }
    });
    
    // CVV input - numbers only
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^\d]/g, '');
    });
}

// Process payment
function processPayment(event) {
    event.preventDefault();
    
    // Get form values
    const username = document.getElementById('username').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const duration = document.getElementById('duration').value;
    const timeSlot = document.getElementById('timeSlot').value;
    const amount = document.getElementById('amount').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Validate form
    if(!username || !mobile || !email || !duration || !timeSlot) {
        alert('Please fill all required fields');
        return;
    }
    
    // Additional validation for online payment
    if(paymentMethod === 'online') {
        const cardType = document.querySelector('input[name="cardType"]:checked').value;
        
        if(cardType === 'credit' || cardType === 'debit') {
            const cardNumber = document.getElementById('cardNumber').value;
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;
            
            if(!cardNumber || !expiry || !cvv) {
                alert('Please fill all card details');
                return;
            }
            
            // Validate card number
            if(cardNumber.length !== 16) {
                alert('Please enter a valid 16-digit card number');
                return;
            }
            
            // Validate expiry date
            if(!/^\d{2}\/\d{2}$/.test(expiry)) {
                alert('Please enter a valid expiry date (MM/YY)');
                return;
            }
            
            // Validate CVV
            if(cvv.length !== 3) {
                alert('Please enter a valid 3-digit CVV');
                return;
            }
        } else if(cardType === 'upi') {
            const upiId = document.getElementById('upiId').value;
            
            if(!upiId) {
                alert('Please enter your UPI ID');
                return;
            }
            
            // Validate UPI ID format
            if(!upiId.includes('@')) {
                alert('Please enter a valid UPI ID');
                return;
            }
        }
    }
    
    // Show loading overlay
    document.getElementById('loadingOverlay').style.display = 'flex';
    
    // Simulate payment processing
    setTimeout(function() {
        // Hide loading overlay
        document.getElementById('loadingOverlay').style.display = 'none';
        
        // Generate a random booking ID
        const bookingId = 'BK' + Date.now().toString().substring(7) + Math.floor(Math.random() * 1000);
        
        // Show confirmation page
        showConfirmation(bookingId, username, duration, timeSlot, amount, paymentMethod);
    }, 2000);
}

// Show booking confirmation
function showConfirmation(bookingId, name, duration, timeSlot, amount, paymentMethod) {
    // Hide payment form
    document.getElementById('payment-form').style.display = 'none';
    
    // Set confirmation details
    document.getElementById('bookingId').textContent = bookingId;
    document.getElementById('confirmName').textContent = name;
    document.getElementById('confirmDuration').textContent = duration + (duration === '1' ? ' hour' : ' hours');
    document.getElementById('confirmTimeSlot').textContent = timeSlot;
    document.getElementById('confirmAmount').textContent = amount;
    document.getElementById('confirmPayment').textContent = 
        paymentMethod === 'online' ? 
        'Online Payment (' + document.querySelector('input[name="cardType"]:checked').value + ')' : 
        'Pay at Venue';
    
    // Show confirmation
    document.getElementById('booking-confirmation').style.display = 'block';
    
    // Log booking data (in a real application, you would send this to a server)
    console.log('Booking completed:', {
        bookingId,
        name,
        duration,
        timeSlot,
        amount,
        paymentMethod,
        timestamp: new Date().toISOString()
    });
}