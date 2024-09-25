{
    'name': 'Leave Management',
    'version': '1.0',
    'summary': 'Module for managing leave applications',
    'description': """A module to manage leave applications for faculty.""",
    'author': 'Abdullah Abbasi',
    'category': 'Uncategorized',
    'website': 'http://yourwebsite.com',
    'depends': ['base'],  # Adjust dependencies as needed
    'data': [
        'security/ir.model.access.csv',
        'views/leave_application_view.xml',
        'views/assets_view.xml',
        'views/leave_information_template.xml',
        
    ],
    'images': ['static/description/icon.png'],
    'assets': {
        'web.assets_frontend': [
            '/leave_management/static/src/img/logo.png',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
