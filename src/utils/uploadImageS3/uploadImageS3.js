import { Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

// TO-DO: Might want to add more Mime Types in here
// This should cover all basic scenarios
// The usage below defaults to JPEG if lookup fails)
const mimeTypes = [
  {extension: 'jpg', mime: 'image/jpeg'},
  {extension: 'jpeg', mime: 'image/jpeg'},
  {extension: 'png', mime: 'image/png'},
  {extension: 'gif', mime: 'image/gif'},
  {extension: 'mp4', mime: 'video/mp4'},
]

const takePhoto = async (uploadImageCallback, multipleImages = false) => {
  let result = await ImagePicker.launchCameraAsync({
    // mediaTypes: "Images",
    mediaTypes: "All",
    exif: true,
    multipleImages: multipleImages,
  });
  // console.log('-- result --', result);
  handleImagePicked(result, uploadImageCallback);
};

const pickImage = async (uploadImageCallback, multipleImages = false) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    // mediaTypes: "Images",
    mediaTypes: "All",
    exif: true,
    allowsMultipleSelection: multipleImages,
  });
  // console.log('-- result --', result);
  handleImagePicked(result, uploadImageCallback);
};

const uploadImage = (filename, img, extension, type) => {
  try{
    const mimeType = type === 'video' ? 'video/mp4' : mimeTypes.find(mime => mime.extension === extension).mime || 'image/jpeg';
    // throw "Here's a made up error!";
    return Storage.put(filename, img, {
      level: "public",
      contentType: mimeType,
    })
      .then((response) => {
        // return response.key;
        return {success: true, key: response.key};
      })
      .catch((error) => {
        console.log(error);
        return {success: false, errorDetails: JSON.stringify(error), errorSummary: "Error uploading image, if the error persists please contact Connor with the Error Details"};
      });
  } catch (err) {
    console.log("Error uploading image", err);
    return {success: false, errorDetails: JSON.stringify(err), errorSummary: "Error uploading image, if the error persists please contact Connor with the Error Details"};
  }
};

const handleImagePicked = async (pickerResult, uploadImageCallback) => {
  try {
    if (pickerResult.canceled) {
      console.log('Upload Canceled');
      return uploadImageCallback({success: false, errorDetails: 'User aborted the image upload', errorSummary: "Upload Cancelled"});
    } else {
      // console.log('-- Picker Result --', pickerResult);
      const uploadedImages = [];
      const assets = pickerResult.assets;
      // console.log('-- Picker Results --', assets);
      for(let i = 0; i < assets.length; i++) {
        uploadedImages.push({
          width: assets[i].width,
          height: assets[i].height,
          exif: assets[i].exif,
          uri: assets[i].uri,
          type: assets[i].type === 'video' ? 'video' : 'image',
        });
      }

      for(let i = 0; i < uploadedImages.length; i++) {
        const image = uploadedImages[i];
        // console.log('-- uploadedImage --', image);
        // Handling for Android returning the wrong Width and Height
        // Orientation of 6 and 8 are Landscape, so we want to make sure we're using the large dimension as the Height in that case
        // If it's not 6 or 8, it's Portrait, so larger dimension in the Width
        let imageWidth = image.width;
        let imageHeight = image.height;
        if(image.exif && image.exif?.Orientation) {
          imageWidth = image.exif?.Orientation === 6 || image.exif?.orientation === 8 ? Math.min(image.width, image.height) : Math.max(image.width, image.height);
          imageHeight = image.exif?.Orientation === 6 || image.exif?.orientation === 8 ? Math.max(image.width, image.height) : Math.min(image.width, image.height);  
        }
        
        const img = await fetchImageFromUri(image.uri);
        const imgName = img._data.name;
        const parseImgName = imgName.split('.');
        const extension = parseImgName[parseImgName.length - 1];
        const newImageName = uuid.v4() + '.' + extension;
        const uploadUrl = await uploadImage(newImageName, img, extension, image.type);
        if(uploadUrl.success) {
          uploadedImages[i].success = true;
          uploadedImages[i].imageObject = {url: uploadUrl.key, width: imageWidth, height: imageHeight}
        } else {
          uploadedImages[i].success = false;
        }
      }

      return uploadImageCallback({success: true, uploadedImages});
    }
  } catch (e) {
    console.log('-- handle Image Picked Error --', e);
  }
};

const fetchImageFromUri = async (uri) => {
  try{
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  } catch (err) {
    console.log('-- fetchImageFromUri Error --', err);
    return false;
  }
};

export default {
  takePhoto,
  pickImage,
};