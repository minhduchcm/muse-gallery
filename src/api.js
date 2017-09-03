import axios from "axios";
import language from "./language.json";

const base = "https://pro.musehall.com/";
export function fetchGalleryData(unknownId1, unknownId2) {
  const url = `${base}private/visite/${unknownId1}/${unknownId2}`;
  return axios
    .get(url)
    .then(res => res.data)
    .then(
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
            image.image = language.urlImage + image.image;
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
