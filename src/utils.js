const paginate = (photos) => {
  const itemsPerPage = 100;
  const pages = photos.length / itemsPerPage;
  console.log(pages);
  const newPhotos = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return photos.slice(start, start + itemsPerPage);
  });

  return newPhotos;
};

export default paginate;
