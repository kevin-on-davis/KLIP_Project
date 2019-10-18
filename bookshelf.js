function manageBookShelf()
{
    if (!localStorage.myBookShelf)
    {
        var shelfItem = new Array();
        shelfItem.push()
    }
    else
    {
        shelfItem = JSON.parse(localStorage.getItem("myBookShelf"));
    }

    for (i=0; i < shelfItem.length; i++)
    {
        $("#bookshelf").append(`<div>Book Information<button id="buyBook"></button><button id="borrowBook"></button><button id="deleteBook"></button></div>`);
    }
}

btn_buybook = $("#buyBook");
btn_brwbook = $("#borrowBook");
btn_delbook = $("#deleteBook");

