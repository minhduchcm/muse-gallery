const base = "https://pro.musehall.com/";
export function fetchGalleryData(unknownId1, unknownId2) {
  const url = `${base}private/visite/${unknownId1}/${unknownId2}`;
  return fetch(url)
    .then(response => response.json())
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
        const rooms = imageRooms.map(room =>
          room.reduce((room, image, imageIndex) => {
            const wallIndex = Math.floor(imageIndex / numOfImagesPerWall);
            if (!room[wallIndex]) room[wallIndex] = [];
            room[wallIndex].push(image);
            return room;
          }, [])
        );
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
