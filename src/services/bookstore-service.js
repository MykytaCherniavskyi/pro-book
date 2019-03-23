export default class BookstoreService {
  data = [
    {
      id: 1,
      title: 'Production Ready',
      author: 'Susan J.',
      price: 40,
      coverImage: 'https://www.bookclub.ua/images/db/goods/k/49491_83552_k.jpg'
    },
    {
      id: 2,
      title: 'Release It!',
      author: 'Michael T.',
      price: 38,
      coverImage: 'https://www.bookclub.ua/images/db/goods/k/37394_56114_k.jpg'
    }
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error('Something bad'));
        } else {
          return resolve(this.data);
        }
      }, 700);
    });
  }
}
