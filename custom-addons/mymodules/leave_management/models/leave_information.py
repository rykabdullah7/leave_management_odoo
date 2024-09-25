from odoo import models, fields, api

class LeaveInformation(models.Model):
    _name = 'leave.information'
    _description = 'Leave Information'

    # Basic fields
    nature_of_leave = fields.Selection([
        ('inland', 'Inland'),
        ('ex_pak', 'Ex-Pak')
    ], string='Nature of Leave', required=True)

    type_of_leave_ids = fields.Many2many(
        'leave.type', 
        'leave_information_type_rel', 
        'leave_information_id', 
        'leave_type_id', 
        string='Type of Leave'
    )

    duration_from = fields.Date(string='Duration From', required=True)
    duration_to = fields.Date(string='Duration To', required=True)
    main_purpose_of_leave = fields.Text(string='Main Purpose of Leave', required=True)
    sub_purpose_of_leave = fields.Text(string='Sub Purpose of Leave')

    # Ex-Pak Information
    sponsor = fields.Selection([
        ('organization','Organization'),
        ('university','University'),
        ('other','Other')
    ],string='Sponsor')
    invitation = fields.Selection([('yes', 'Yes'), ('no', 'No')], string='Invitation Received')
    passport = fields.Char(string='Travelling Passport')
    visiting_country = fields.Many2one('res.country', string='Visiting Country')
    city_name = fields.Many2one('res.country.state', string='City Name', domain="[('country_id', '=', visiting_country)]")
    cities_planned = fields.Char(string='Cities Planned to Visit')
    
    visa_status = fields.Selection([
        ('yes', 'Yes'),
        ('no', 'No')
    ],string='Visa Status')
    foreign_email = fields.Char(string='Foreign Email')
    foreign_contact_number = fields.Char(string='Foreign Contact Number')
    emergency_contact_email = fields.Char(string='Emergency Contact Email')
    relationship = fields.Char(string='Relationship with Emergency Contact')
    emergency_contact_name = fields.Char(string='Emergency Contact Name')

    # Submitting Application
    noc = fields.Selection([('yes', 'Yes'), ('no', 'No')], string='NOC Needed')
    accommodation = fields.Selection([('yes', 'Yes'), ('no', 'No')], string='NUST Accommodation')
    bond = fields.Selection([('yes', 'Yes'), ('no', 'No')], string='Bond Signed')
    affidavit = fields.Boolean(string='Affidavit')
    nust_info = fields.Boolean(string='NUST Info')

    @api.constrains('duration_from', 'duration_to')
    def _check_duration_dates(self):
        for record in self:
            if record.duration_to and record.duration_from:
                if record.duration_to < record.duration_from:
                    raise models.ValidationError("The 'To Date' must be after the 'From Date'.")


class LeaveType(models.Model):
    _name = 'leave.type'
    _description = 'Leave Type'

    name = fields.Char(string="Leave Type", required=True)

