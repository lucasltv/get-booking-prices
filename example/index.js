const { getRooms } = require('../dist');

const getData = async () => {
  try {
    const hotelSlug = 'zarzuela'; // Get the hotel slug from Booking.com url details page
    const checkin = new Date();
    const checkout = new Date();
    checkout.setDate(checkout.getDate() + 1);
    const options = { adults: 2, country: 'br' };
    const rooms = await getRooms(hotelSlug, checkin, checkout, options);
    console.log(`Rooms:`, rooms);
  } catch (e) {
    console.error(e);
  }
};

getData();
