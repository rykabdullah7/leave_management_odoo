from odoo import http
from werkzeug.utils import redirect

class LeaveInformationController(http.Controller):
    
    @http.route('/leave_information', auth='public', website=True)
    def leave_information_form(self, **kwargs):
        countries_list = http.request.env['res.country'].search([])
        leave_types = http.request.env['leave.type'].search([])
        states_list = http.request.env['res.country.state'].search([])
        values = { 'countries' : countries_list,
                   'leave_types': leave_types,
                   'states': states_list}
        print (states_list, values)
        # Render the form template with options
        return http.request.render('leave_management.leave_information_template' , values)
    
    @http.route('/submit_leave_information', type='http', auth='public', methods=['POST'], website=True, csrf=False)
    def submit_leave_information(self, **post):
        # Retrieve form data
        nature_of_leave = post.get('nature_of_leave')
                # Handle multiple selections manually
        type_of_leave_ids = http.request.httprequest.form.getlist('type_of_leave_ids')
        
        duration_from = post.get('duration_from')
        duration_to = post.get('duration_to')
        main_purpose_of_leave = post.get('main_purpose_of_leave')
        sub_purpose_of_leave = post.get('sub_purpose_of_leave')

        # Ex-Pak Information
        sponsor = post.get('sponsor_host')
        invitation = post.get('invitation_received')
        passport = post.get('traveling_passport')
        visiting_country = post.get('visiting_country')
        cities_planned = post.get('cities_visited')
        city_name = post.get('visiting_city')
        visa_status = post.get('visa_status')
        foreign_email = post.get('foreign_email')
        foreign_contact_number = post.get('foreign_contact_number')
        emergency_contact_email = post.get('emergency_contact_email')
        relationship = post.get('relationship')
        emergency_contact_name = post.get('emergency_contact_name')

        # Submitting Application
        noc = post.get('noc_needed') 
        accommodation = post.get('nust_accommodation') 
        bond = post.get('bond_signed') 
        affidavit = post.get('affidavit') == 'on'
        nust_info = post.get('nust_info') == 'on'
        print(f"Type of IDs: {type_of_leave_ids}")
       

        
        # Create a new record in the leave.information model
        leave_data = {
            'nature_of_leave': nature_of_leave,
            'type_of_leave_ids': [(6, 0, [int(id) for id in type_of_leave_ids if id])],  # Many2many field format
            'duration_from': duration_from,
            'duration_to': duration_to,
            'main_purpose_of_leave': main_purpose_of_leave,
            'sub_purpose_of_leave': sub_purpose_of_leave,

            # Ex-Pak Information
            'sponsor': sponsor,
            'invitation': invitation,
            'passport': passport,
            'visiting_country': visiting_country,
            'cities_planned': cities_planned,
            'city_name': city_name,
            'visa_status': visa_status,
            'foreign_email': foreign_email,
            'foreign_contact_number': foreign_contact_number,
            'emergency_contact_email': emergency_contact_email,
            'relationship': relationship,
            'emergency_contact_name': emergency_contact_name,
            'noc': noc,
            'accommodation': accommodation,
            'bond': bond,
            'affidavit': affidavit,
            'nust_info': nust_info,
        }

        # Save the data to the model
        http.request.env['leave.information'].sudo().create(leave_data)
        
        # Redirect to the form page
        return redirect('/leave_information')
