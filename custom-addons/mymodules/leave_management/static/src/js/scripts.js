document.addEventListener('DOMContentLoaded', function () {
    var nextButton1 = document.getElementById('next-button-1');
    var nextButton2 = document.getElementById('next-button-2');
    var backButton = document.getElementById('back-button');
    var backButton2 = document.getElementById('back-button-2');
    var submitButton = document.getElementById('submit-button');

    var leaveInformation = document.getElementById('leave-information');
    var exPakInformation = document.getElementById('ex-pak-information');
    var submittingApplication = document.getElementById('submitting-application');

    var breadcrumb1 = document.getElementById('breadcrumb-1');
    var breadcrumb2 = document.getElementById('breadcrumb-2');
    var breadcrumb3 = document.getElementById('breadcrumb-3');

    var fromDateInput = document.getElementById('duration_from');
    var toDateInput = document.getElementById('duration_to');
    var otherRequiredFields1 = document.querySelectorAll('.required input, .required textarea');
    var otherRequiredFields2 = document.querySelectorAll('.required input, .required textarea');
   
    // Radio buttons and checkbox groups with new class selectors
    var radioButtonGroups = document.querySelectorAll('.radio-buttons');
    var checkboxGroups = document.querySelectorAll('.checkboxes');

        // Helper to create error message element
    function createErrorMessage(message) {
        var errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.9em';
        errorDiv.textContent = message;
        return errorDiv;
    }

            // Remove existing error messages
    function removeErrorMessages() {
        var errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (msg) {
            msg.remove();
        });
    }



    function initialize() {
        leaveInformation.style.display = 'block';
        exPakInformation.style.display = 'none';
        submittingApplication.style.display = 'none';

        breadcrumb1.classList.add('active');
        breadcrumb1.classList.remove('grey-font');
        breadcrumb2.classList.remove('active');
        breadcrumb2.classList.add('grey-font');
        breadcrumb3.classList.remove('active');
        breadcrumb3.classList.add('grey-font');
    }

    initialize();

    function validateDateRange() {
        removeErrorMessages();
        var fromDate = new Date(fromDateInput.value);
        var toDate = new Date(toDateInput.value);

        if (toDateInput.value && fromDateInput.value) {
            if (toDate <= fromDate) {
                var errorMessage = createErrorMessage('To Date must be greater than From Date.');
                toDateInput.focus();
                toDateInput.parentElement.appendChild(errorMessage)
                toDateInput.style.border = '2px solid red';
                
                return false;
            }
        } else {
            if(!fromDateInput.value){
                var errorMessage = createErrorMessage('Please select From Date.');
                fromDateInput.focus();
                fromDateInput.parentElement.appendChild(errorMessage)
                fromDateInput.style.border = '2px solid red';
            }
            else if(!toDateInput.value){
                var errorMessage = createErrorMessage('Please select To Date');
                toDateInput.focus();
                toDateInput.parentElement.appendChild(errorMessage)
                toDateInput.style.border = '2px solid red';
            }
           
            return false;
        }

        return true;

    }
    
    // Validation for radio button groups
    function validateRadioGroups() {
        removeErrorMessages();
        var allGroupsValid = true;

        radioButtonGroups.forEach(function (group) {
            var radios = group.querySelectorAll('input[type="radio"]');
            var isOneChecked = Array.from(radios).some(function (radio) {
                return radio.checked;
            });

            if (!isOneChecked) {
                var label = group.querySelector('label');  // Find the label element
                var errorMessage = createErrorMessage('Please select an option.');
                errorMessage.style.display = 'inline'; 
                errorMessage.style.marginLeft = '10px';
                radios[0].focus();
                // Insert the error message after the label
                label.insertAdjacentElement('afterend', errorMessage);  
                
                allGroupsValid = false;
            } else {
                group.style.border = '';  // Reset group border if valid
            }
        });

        return allGroupsValid;
    }

    // Validation for checkbox groups
    function validateCheckboxGroups() {
        removeErrorMessages();
        
        var allGroupsValid = true;

        checkboxGroups.forEach(function (group) {
            var checkboxes = group.querySelectorAll('input[type="checkbox"]');
            var isOneChecked = Array.from(checkboxes).some(function (checkbox) {
                return checkbox.checked;
            });

            if (!isOneChecked) {
                var label = group.querySelector('label');  // Find the label element
                var errorMessage = createErrorMessage('Please select at least one checkbox.');
                errorMessage.style.display = 'inline'; 
                errorMessage.style.marginLeft = '10px';
                // Insert the error message after the label
                label.insertAdjacentElement('afterend', errorMessage);  
                
                allGroupsValid = false;
            } else {
                group.style.border = '';  // Reset group border if valid
            }
        });

        return allGroupsValid;
    }
    
    // function validateFields(fields) {
    //     let errorMessages = [];
    //     console.log(fields);
    //     fields.forEach(field => {
    //         if (field.type === 'radio') {
    //             // Validate radio buttons by checking if at least one is checked in the group
    //             let name = field.name;
    //             let radios = document.querySelectorAll(`input[name="${name}"]`);
    //             let oneChecked = Array.from(radios).some(radio => radio.checked);
    //             if (!oneChecked) {
    //                 errorMessages.push(`Please select an option for ${name}`);
    //             }
    //         } else if (field.type === 'checkbox') {
    //             // Validate text area by checking if it's empty
    //             if (field.value.trim() === '') {
    //                 errorMessages.push(`Please fill out the ${field.name} field.`);
    //             }
    //         } else if (field.value.trim() === '') {
    //             // For all other inputs, check if the field is empty
    //             errorMessages.push(`Please fill out the ${field.name} field.`);
    //         }
    //     });

    //     return errorMessages;
    // }
   
    
     // Validation for required fields
     function validateFields(fields) {
        var allFilled = true;
        removeErrorMessages();  // Clear existing error messages
        
        fields.forEach(function (field) {
            if (field.value.trim() === '') {
                var errorMessage = createErrorMessage('This field is required.');
                field.parentNode.appendChild(errorMessage);
                field.style.border = '2px solid red';  // Highlight empty field
                allFilled = false;
            } else {
                field.style.border = '';  // Reset field style if filled
            }
        });
        return allFilled;
    }
    

    nextButton1.addEventListener('click', function () {
          if (validateRadioGroups() && validateCheckboxGroups() && validateDateRange() && validateFields(otherRequiredFields1)) {
            leaveInformation.style.display = 'none';
            exPakInformation.style.display = 'block';
            breadcrumb1.classList.remove('active');
            breadcrumb1.classList.add('grey-font');
            breadcrumb2.classList.add('active');
            breadcrumb2.classList.remove('grey-font');
        }
    });

    nextButton2.addEventListener('click', function () {
        
            exPakInformation.style.display = 'none';
            submittingApplication.style.display = 'block';
            breadcrumb2.classList.remove('active');
            breadcrumb2.classList.add('grey-font');
            breadcrumb3.classList.add('active');
            breadcrumb3.classList.remove('grey-font');
        
    });

    backButton.addEventListener('click', function () {
        exPakInformation.style.display = 'none';
        leaveInformation.style.display = 'block';
        breadcrumb2.classList.remove('active');
        breadcrumb2.classList.add('grey-font');
        breadcrumb1.classList.add('active');
        breadcrumb1.classList.remove('grey-font');
    });

    backButton2.addEventListener('click', function () {
        submittingApplication.style.display = 'none';
        exPakInformation.style.display = 'block';
        breadcrumb3.classList.remove('active');
        breadcrumb2.classList.add('active');
        breadcrumb3.classList.add('grey-font');
        breadcrumb1.classList.remove('grey-font');
    });
    submitButton.addEventListener('click', function () {
        // Add your form submission logic here
    });
});
