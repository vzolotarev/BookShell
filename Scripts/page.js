(function ($) {
    $.widget("app.bookShell", {
        options: {
            data: null,
        },

        _create: function () {
            var that = this;
            this.table = this.element.find('#book-table');
            this.editor = this.element.find('#book-modal');
            this.buttonAddBook = this.element.find('#btn-add-book');
            this.bookControl = this.editor.find(".modal-body");

            this.myDataTable = this.table.DataTable({
                ajax: "/Home/GetAllBooks/",
                columns: [
                    { "data": "Name" },
                    { "data": "Author" },
                    { "data": "Year" },
                    { "data": "PageCount" },
                    { "data": "ISBN" }
                ],
                "columnDefs": [
                    {
                        "targets": 5,
                        "data": null,
                        "render": function (data, type, row) {
                            return '<a href="#" class="EditBook">Редактировать...</a><br>' +
                                '<a href="#" class="DelBook">Удалить...</a>';
                        }
                    },
                ],
                language: {
                    url: '~/Content/Russian.json'
                },
                initComplete: function (settings, json) {
                    that._setEditRemove();    
                }
            });

            this.buttonAddBook.on('click', function () {
                that.addBook();
            });

            this.bookControl.BookControl({
                saveBook_event: $.proxy(function (event, newbook, rowIndex) {
                    this.saveBook(newbook, rowIndex);
                    this.editor.modal('hide');
                },this)});
        },

        _setEditRemove: function () {
            var that = this;
            this.table.find('.DelBook').each(function (index) {
                $(this).on('click', function () {
                    var tr = $(this).closest("tr");
                    var rowIndex = that.myDataTable.row(tr).index();
                    return that.delBook(rowIndex);
                });
            });
            this.table.find('.EditBook').each(function (index) {
                $(this).on('click', function () {
                    var tr = $(this).closest("tr");
                    var rowIndex = that.myDataTable.row(tr).index();
                    return that.editBook(rowIndex);
                });
            });
        },

        addBook: function () {
            this.editor.modal('show');
            this.bookControl.BookControl("cleareBook");
        },

        editBook: function (rowIndex) {
            var row = this.myDataTable.row(rowIndex);
            var book = JSON.parse(JSON.stringify(row.data()));
            this.editor.modal('show');
            this.bookControl.BookControl("fillBook", book, rowIndex);
        },

        delBook: function (rowIndex) {
            var row = this.myDataTable.row(rowIndex);
            var book = JSON.parse(JSON.stringify(row.data()));
            if (confirm("Bы уверены, что хотите удалить книгу \"" + book.Name + "\" ISBN: " + book.ISBN + "?")) {
                $.ajax({
                    url: "/Home/DelBook/",
                    type: "POST",
                    data: book,
                    success: function (response) {
                        row.remove().draw()
                    },
                    error: function (response) {
                        alert("Ошибка при удалении.");
                        console.log(response);
                    },
                });  
                return true;
            } else return false;
        },

        saveBook: function (newbook, rowIndex) {
            var that = this;
            var oldbook = null;
            var row = null;
            if (rowIndex != null) {
                row = this.myDataTable.row(rowIndex);
                if (row != null) {
                    var oldbook = JSON.parse(JSON.stringify(row.data()));
                } 
            }
            var newbook = JSON.parse(JSON.stringify(newbook));
            $.ajax({
                url: "/Home/SaveBook/",
                type: "POST",
                data: { oldbook: oldbook, newbook: newbook },
                success: function (response) {
                    if (response.type == 'Edit') {
                        //row.invalidate('auto').draw();
                        that.myDataTable.ajax.reload(function () { that._setEditRemove(); });
                    }

                    if (response.type == 'Add') {
                        that.myDataTable.ajax.reload(function () { that._setEditRemove(); });
                    }
                },
                error: function (response) {
                    alert("Ошибка при добавлении\редактировании.");
                    console.log(response);
                },
            });  
        }
    })
}(jQuery))