import React from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withBookstoreService } from '../hoc';
import ErrorIndicator from '../error-indicator';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

//Разбиение на компонент для взаимодействия и отрисовки
class BookListContainer extends React.Component {
  componentDidMount() {
    // Переписано на fetchBooks()
    // 1. receive data
    // const {
    //   bookstoreService,
    //   booksLoaded,
    //   booksRequested,
    //   booksError
    // } = this.props;
    // // 2. dispatch action to store
    // booksRequested();
    // bookstoreService
    //   .getBooks()
    //   .then(data => booksLoaded(data))
    //   .catch(err => booksError(err));
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (error) {
      return <ErrorIndicator />;
    }

    if (loading) {
      return <Spinner />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

//Свойства mapStateToProps являються частью глобального стейта. Возращаем только нужное
const mapStateToProps = ({ bookList: { books, loading, error } }) => {
  return {
    books,
    loading,
    error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: id => dispatch(bookAddedToCart(id))
  };
};

//Упрощенный вариант (автоматический вызов bindActionCreators)
// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   booksError
// };

//Классический вариант
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       booksLoaded
//     },
//     dispatch
//   );

//   //без bindActionCreators
//   // return {
//   //   booksLoaded: newBooks => {
//   //     dispatch(booksLoaded(newBooks));
//   //   }
//   // };
// };

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookListContainer);

// export default withBookstoreService()(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(BookList)
// );
