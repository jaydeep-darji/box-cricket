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