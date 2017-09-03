const base = "https://pro.musehall.com/";
export function fetchGalleryData(unknownId1, unknownId2) {
  const url = `${base}private/visite/${unknownId1}/${unknownId2}`;
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
    });
}
