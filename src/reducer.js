import {
  SET_LOADING,
  SET_PHOTOS,
  REMOVE_PHOTO,
  HANDLE_CHANGE,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_PHOTOS:
      const onlyUnique = (value, index, self) => self.indexOf(value) === index;

      let albumsId = [
        ...action.payload.photos.map((photo) => photo.albumId),
        "All",
      ];

      const uniqueAlbumId = albumsId.filter(onlyUnique);
      return {
        ...state,
        isLoading: false,
        photos: action.payload.photos,
        AllPhotos: action.payload.photos,
        allAlbumId: uniqueAlbumId,
      };
    case REMOVE_PHOTO:
      return {
        ...state,
        photos: state.photos.filter((photo) => photo.id !== action.payload),
        AllPhotos: state.AllPhotos.filter(
          (photo) => photo.id !== action.payload
        ),
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        albumId: action.payload,
        photos:
          action.payload !== "All"
            ? state.AllPhotos.filter(
                (photo) => photo.albumId === action.payload
              )
            : state.AllPhotos,
      };

    default:
      throw new Error(`no mathching "${action.type}" action type`);
  }
};
export default reducer;
