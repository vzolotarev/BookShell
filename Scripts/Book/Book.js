(function ($) {
    $.widget("app.BookControl", {
        options: {
            data: null
        },

        _create: function () {
            var that = this;
            this.Name = this.element.find('#Name');
            this.Author = this.element.find('#Author');
            this.Year = this.element.find('#Year');
            this.PageCount = this.element.find('#PageCount');
            this.ISBN = this.element.find('#ISBN');
            this.buttonSave = this.element.find('#SaveBook');
            this.buttonSave.on('click', function () {
                that.saveBook();
            });

            that.cleareBook();
        },

        cleareBook: function () {
            this.rowIndex = null;
            $(this.Name).val('');
            $(this.Author).val('');
            $(this.Year).val('');
            $(this.PageCount).val('');
            $(this.ISBN).val('');
        },

        fillBook: function (book, rowIndex) {
            this.rowIndex = rowIndex;
            $(this.Name).val(book.Name);
            $(this.Author).val(book.Author);
            $(this.Year).val(book.Year);
            $(this.PageCount).val(book.PageCount);
            $(this.ISBN).val(book.ISBN);
        },

        saveBook: function (element) {
            var newBook =
                {
                    Name: $(this.Name).val(),
                    Author: $(this.Author).val(),
                    Year: $(this.Year).val(),
                    PageCount: $(this.PageCount).val(),
                    ISBN: $(this.ISBN).val()
                };
            this._trigger("saveBook_event", null, [newBook, this.rowIndex]);
        }
    });
}(jQuery))