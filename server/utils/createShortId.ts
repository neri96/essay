import shortId from 'short-uuid';

const translator = shortId(shortId.constants.flickrBase58, {
    consistentLength: false,
});
  
export const cid = () => translator.new(); 