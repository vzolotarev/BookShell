using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplicationBookShell.Controllers
{
    public class Book
    {
        public string Author { get; set; }
        public string Name { get; set; }
        public string ISBN { get; set; }
        public int Year { get; set; }
        public int PageCount { get; set; }
    }

    public class HomeController : Controller
    {
        public static List<Book> BookList = new List<Book>( new[]
        {
            new Book {
                Author = "Стругацкий Аркадий Натанович, Стругацкий Борис Натанович",
                Name = "Понедельник начинается в субботу",
                ISBN = "978-5-17-041678-3",
                Year = 2014,
                PageCount =336
            },
            new Book {
                Author = "Кирилл Королев, Роджер Желязны",
                Name = "Хроники Амбера",
                ISBN = "978-5-699-06778-7",
                Year = 2004,
                PageCount = 1280
            }
        });

        public HomeController()
        {
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllBooks()
        {
            return Json( new
            {
                data = BookList
            }, "application/json", JsonRequestBehavior.AllowGet);
        }

        public ActionResult DelBook(Book book)
        {
            if (BookList.Remove(BookList.Find(p => p.Author == book.Author && p.Name == book.Name && p.ISBN == book.ISBN && p.Year == book.Year && p.PageCount == book.PageCount)))
            {
                return Json(new {
                    success = true,
                    responseText = "Книга успешно удалена."
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new {
                    success = false,
                    responseText = "Ошибка при попытке удаления книги."
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult SaveBook(Book oldbook,Book newbook)
        {
            Book book = null;

            if (oldbook != null) {
                book = BookList.Find(p => p.Author == oldbook.Author && p.Name == oldbook.Name && p.ISBN == oldbook.ISBN && p.Year == oldbook.Year && p.PageCount == oldbook.PageCount);
            } else
            {
                book = new Book
                {
                    Author = newbook.Author,
                    Name = newbook.Name,
                    ISBN = newbook.ISBN,
                    Year = newbook.Year,
                    PageCount = newbook.PageCount
                };
                BookList.Add(book);
            };
           
            if (book != null)
            {
                book.Author = newbook.Author;
                book.Name = newbook.Name;
                book.ISBN = newbook.ISBN;
                book.Year = newbook.Year;
                book.PageCount = newbook.PageCount;

                if (oldbook != null)
                {
                    return Json(new
                    {
                        success = true,
                        type = "Edit",
                        responseText = "Книга успешно обновлена."
                    }, JsonRequestBehavior.AllowGet);
                } else
                {
                    return Json(new
                    {
                        success = true,
                        type = "Add",
                        responseText = "Книга успешно обновлена."
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new
                {
                    success = false,
                    type = "Error",
                    responseText = "Ошибка при попытке обновлении книги."
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}