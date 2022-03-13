const paginate = (photos) => {
  const estimatedItemsPerPage = 100;
  const pages = Math.ceil(photos.length / estimatedItemsPerPage);
  const newPhotos = Array.from({ length: pages }, (_, index) => {
    const start = index * estimatedItemsPerPage;
    return photos.slice(start, start + estimatedItemsPerPage);
  });
  return newPhotos;
};

export default paginate;
