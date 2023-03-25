# get-booking-prices

Tiny library to retrieve booking data (rooms with their prices) from Booking.com.

Requires node version >= 18 (uses new native fetch to make http requests)

Uses [cheerio.js](https://cheerio.js.org/) to parse data from HTML data.

## Installation

```sh
yarn add get-booking-prices
```

## Usage (React)

```js
import { getRooms } from "get-booking-prices";
import * as React from "react";

export default function App() {
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const hotelSlug = "zarzuela"; // Get the hotel slug from Booking.com url details page
        const checkin = new Date();
        const checkout = new Date();
        checkout.setDate(checkout.getDate() + 1);
        const options = { 
          adults: 2, // Optional. Default: 2
          country: 'br', // Optional. Default: br (hotel country)
        };
        const rooms = await getRooms(hotelSlug, checkin, checkout, options);
        setRooms(rooms);
        console.log(`Rooms:`, rooms);
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <span>Rooms availability: {rooms.length}</span>
    </div>
  );
}

```
