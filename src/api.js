import axios from 'axios';
import language from './language.json';

const base = 'https://pro.musehall.com/';
export function fetchGalleryData(unknownId1, unknownId2) {
  return Promise.resolve({
    imgSalle1: [
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      }
    ],
    imgSalle2: [
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      }
    ],
    imgSalle3: [
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      }
    ],
    imgSalle4: [
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      },
      {
        image:
          'http://www.doanhnhansaigon.vn/ic/l/o/w620h405f1c1-files-articles-2015-1093936-lozi-doanhnhansaigon.jpg'
      }
    ],
    nbRoom: 4,
    name: 'a',
    title: 'a',
    subtitle: 'b'
  }).then(
    ({
      id,
      company,
      date,
      description,
      start,
      end,
      free,
      imgSalle1,
      imgSalle2,
      imgSalle3,
      imgSalle4,
      nbRoom,
      mainImage,
      name,
      title,
      subtitle,
      theme,
      price,
      profileImg
    }) => {
      const imageRooms = [imgSalle1, imgSalle2, imgSalle3, imgSalle4].filter(
        room => room.length > 0
      );
      const numOfImagesPerWall = Math.min(
        ...imageRooms.map(room => room.length),
        3
      );
      let preloadImagePromise = [];

      const rooms = imageRooms.map(room =>
        room.reduce((room, image, imageIndex) => {
          const wallIndex = Math.floor(imageIndex / numOfImagesPerWall);
          if (!room[wallIndex]) room[wallIndex] = [];
          // image.image = language.urlImage + image.image;
          preloadImagePromise.push(
            new Promise(resolve => {
              let img = new Image();
              img.onload = resolve;
              img.src = image.image;
            })
          );
          room[wallIndex].push(image);
          return room;
        }, [])
      );

      Promise.all(preloadImagePromise);
      return {
        id,
        company,
        date,
        description,
        start,
        end,
        free,
        rooms,
        nbRoom,
        mainImage,
        name,
        title,
        subtitle,
        theme,
        price,
        profileImg
      };
    }
  );
}
