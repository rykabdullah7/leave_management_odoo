// odoo.define('leave_management.form_navigation', function (require) {
//     'use strict';

//     var publicWidget = require('web.public.widget');
//     var core = require('web.core');

//     publicWidget.registry.FormNavigation = publicWidget.Widget.extend({
//         selector: '#leave-information', // Make sure this matches the ID in your XML
//         events: {
//             'click .btn-next': '_onNextClick',
//             'click .btn-prev': '_onPrevClick',
//         },

//         init: function (parent, options) {
//             this._super(parent, options);
//             this.currentStep = 0; // Tracks the current step
//             this.steps = [
//                 '#leave-information',
//                 '#ex-pak-information',
//             ];
//         },

//         start: function () {
//             this._super.apply(this, arguments);
//             this._showStep(this.currentStep);
//         },

//         _onNextClick: function () {
//             if (this.currentStep < this.steps.length - 1) {
//                 this._showStep(++this.currentStep);
//             }
//         },

//         _onPrevClick: function () {
//             if (this.currentStep > 0) {
//                 this._showStep(--this.currentStep);
//             }
//         },

//         _showStep: function (stepIndex) {
//             this.steps.forEach((step, index) => {
//                 if (index === stepIndex) {
//                     $(step).show();
//                 } else {
//                     $(step).hide();
//                 }
//             });
//         }
//     });

//     return publicWidget.registry.FormNavigation;
// });
