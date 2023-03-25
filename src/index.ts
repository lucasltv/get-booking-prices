import * as cheerio from 'cheerio';
import { fetchData, formatDate, removeLineBreakers } from './helpers';

export type HotelRoomAvailability = {
  name: string;
  price: number;
  occupancy: number;
};

export type GetRoomsOptions = {
  customHeaders?: Record<string, string>;
};

// const saveSreenShot = (data: string) => {
//   return new Promise((resolve, reject) => {
//     writeFile("booking.html", data, (err) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(null);
//     });
//   });
// };

export async function getRooms(
  hotelSlug: string,
  checkin: Date,
  checkout: Date,
  adults: number,
  country: string,
  options?: GetRoomsOptions
): Promise<HotelRoomAvailability[]> {
  const { customHeaders = {} } = options || {};
  const _checkin = formatDate(checkin);
  const _checkout = formatDate(checkout);

  const url = `https://www.booking.com/hotel/${country}/${hotelSlug}.pt-br.html?checkin=${_checkin}&checkout=${_checkout}&group_adults=${adults}&do_availability_check=1`;

  const data = await fetchData(url, customHeaders);
  const $ = cheerio.load(data);

  const trs = $('tr.js-rt-block-row').toArray();

  const rooms: HotelRoomAvailability[] = [];
  let roomName = ''; // Common room name (entire tr)
  trs.forEach(tr => {
    const room: HotelRoomAvailability = {
      name: roomName,
      price: 0,
      occupancy: 0,
    };
    const tds = $(tr)
      .find('td.hprt-table-cell')
      .toArray();
    let pushed = false;
    tds.forEach(td => {
      const _td = $(td);
      const className = _td.attr('class') || '';

      if (className.indexOf('first') > -1) {
        roomName = removeLineBreakers(
          _td
            .find('span')
            .first()
            .text()
        ); // New Room loop
        room.name = roomName;
      } else if (className.indexOf('occupancy') > -1) {
        room.occupancy = _td.find('i').length || 1;
      } else if (className.indexOf('price') > -1) {
        room.price = +_td
          .find('span')
          .first()
          .text()
          .replace(/^\D+/g, '')
          .replace('.', '')
          .replace(',', '.');
      } else if (
        !pushed &&
        typeof room.price === 'number' &&
        typeof room.occupancy === 'number'
      ) {
        pushed = true;
        rooms.push(room);
      }
    });
  });

  return rooms;
}
