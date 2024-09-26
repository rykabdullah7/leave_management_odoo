{
    'name': 'Student Results Management',
    'version': '1.0',
    'category': 'Education',
    'summary': 'Module to manage student results',
    'author': 'Muhammad Abdullah Khan Abbasi',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/student_result_views.xml',
        'views/menu_views.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}
