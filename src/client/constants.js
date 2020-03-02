import image1 from './assets/images/slide_properties.jpg';
import image2 from './assets/images/slide_brokers.jpg';
import image3 from './assets/images/slide_favorites.jpg';

export const routerPath = {
    home:'/home',
    brokers:'/broker',
    favorites:'/favorite',
    properties:'/property',
    property:'/property/:id',
    broker:'/broker/:id'
}

export const pageTitle = {
    home:'Home',
    brokers:'Brokers',
    favorites:'Favorites',
    properties:'Properties'
}
export const data = [
    {
      id: 1,
      note: 'Your dream is just a few taps away! Select Properties in the menu to start your search',
      image: image1
    },
    {
      id: 2,
      note: 'Select Brokers menu to connect with the best brokers in the business in a whole way!',
      image: image2
    },
    {
      id: 3,
      note: 'Keep track of your favorites and get notified in real time when important events happen.',
      image: image3
    }
  ];

