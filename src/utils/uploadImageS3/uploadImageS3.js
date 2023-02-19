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
]

export const takePhoto = async (uploadImageCallback) => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: "Images",
    exif: true,
  });

  handleImagePicked(result, uploadImageCallback);
};

export const pickImage = async (uploadImageCallback) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
    exif: true,
  });
  handleImagePicked(result, uploadImageCallback);
};

const uploadImage = (filename, img, extension) => {
  try{
    const mimeType = mimeTypes.find(mime => mime.extension === extension).mime || 'image/jpeg';
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
    if (pickerResult.cancelled) {
      console.log('Upload Cancelled');
      return uploadImageCallback({success: false, errorDetails: 'User aborted the image upload', errorSummary: "Upload Cancelled"});
    } else {
      const { width, height, exif } = pickerResult;
      // Handling for Android returning the wrong Width and Height
      // Orientation of 6 and 8 are Landscape, so we want to make sure we're using the large dimension as the Height in that case
      // If it's not 6 or 8, it's Portrait, so larger dimension in the Width
      let imageWidth = width;
      let imageHeight = height;
      if(exif?.Orientation) {
        imageWidth = exif?.Orientation === 6 || exif?.orientation === 8 ? Math.min(width, height) : Math.max(width, height);
        imageHeight = exif?.Orientation === 6 || exif?.orientation === 8 ? Math.max(width, height) : Math.min(width, height);  
      }
      const img = await fetchImageFromUri(pickerResult.uri);
      const imgName = img._data.name;
      const parseImgName = imgName.split('.');
      const extension = parseImgName[parseImgName.length - 1];
      const newImageName = uuid.v4() + '.' + extension;
      const uploadUrl = await uploadImage(newImageName, img, extension);
      // console.log('-- uploadUrl --', uploadUrl);
      if(uploadUrl.success) {
        return uploadImageCallback({success: true, imageObject: {url: uploadUrl.key, width: imageWidth, height: imageHeight}});
      } else {
        return uploadImageCallback(uploadUrl);
      }
    }
  } catch (e) {
    console.log(e);
    // console.log("Upload failed");
  }
};

const fetchImageFromUri = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};