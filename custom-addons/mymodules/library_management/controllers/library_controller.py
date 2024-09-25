#library_management/controllers/library_controller.py
from odoo import http

class LibraryController(http.Controller):
    @http.route('/library/books', auth='public', website=True)
    def list_books(self, **kwargs):
        books = http.request.env['library.book'].search([])
        return http.request.render('library_management.library_book_template', {
            'books': books
        })
