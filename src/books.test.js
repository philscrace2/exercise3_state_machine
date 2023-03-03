import BooksPresenter from "./Books/BooksPresenter";
import booksRepository from "./Books/BooksRepository";
import httpGateway from "./Shared/HttpGateway";


it("should hit backend API and load 3 viewmodel books when 3 books loaded from the backend", async() => {

    httpGateway.get = jest.fn().mockImplementation(() => {
        return {"success":true,"result":[{"bookId":42191,"name":"Wind in the willows","ownerId":"philscrace@gmail.com","author":"Kenneth Graeme"},{"bookId":42201,"name":"I, Robot","ownerId":"philscrace@gmail.com","author":"Isaac Asimov"},{"bookId":42211,"name":"The Hobbit","ownerId":"philscrace@gmail.com","author":"Jrr Tolkein"}]}
    });

    let viewModel = null;
    let booksPresenter = new BooksPresenter();

    await booksPresenter.load(generatedViewModel => {
        viewModel = generatedViewModel;
    });

    expect(httpGateway.get).toHaveBeenCalledWith("https://api.logicroom.co/api/philscrace@gmail.com/books");

    expect(viewModel.length).toBe(3);
    expect(viewModel[0].name).toBe("Wind in the willows");
    expect(viewModel[1].name).toBe("I, Robot");
    expect(viewModel[2].name).toBe("The Hobbit");



});

it("Should be true!", async() => {
    expect(true).toBe(true);

});
