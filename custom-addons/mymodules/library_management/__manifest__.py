{
    'name': 'Library Management',
    'version': '1.0',
    'summary': 'A simple library management system',
    'description': """Manage books and authors""",
    'category': 'Uncategorized',
    'author': 'Your Name',
    'website': 'http://yourwebsite.com',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv', 
        'views/library_book_views.xml',
        'views/library_author_views.xml',
        'views/assets.xml',
        'views/templates.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}

