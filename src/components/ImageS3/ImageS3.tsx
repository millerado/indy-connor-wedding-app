import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { Storage } from 'aws-amplify';
import * as FileSystem from "expo-file-system";
import { calcDimensions } from '../../styles';
import ActivityIndicator from "../ActivityIndicator/ActivityIndicator";

const findImageInCache = async (fileName) => {
  // console.log('-- findImageInCache --', fileName);
  try {
    let info = await FileSystem.getInfoAsync(fileName);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}

const cacheImage = async (fileName, cacheUri, callback) => {
  // console.log("Filename cache: ", fileName);
  try {
    const S3Url = await Storage.get(fileName);
    const downloadImage = FileSystem.createDownloadResumable(
      S3Url,
      cacheUri,
      {},
      callback
    );
    
    const downloaded = await downloadImage.downloadAsync();
    return {
      cached: true,
      err: false,
      path: downloaded,
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
}

const renderPlaceholder = (width, height, borderRadius, absolute) => {
  return (
    <View style={{position: absolute ? 'absolute' : 'relative', width: width, height: height || width, alignItems: 'center', justifyContent: 'center', borderRadius: borderRadius}} >
      <ActivityIndicator size={Math.min(width, height) * .5} />
    </View>
  );
}

const ImageS3 = (props) => {
  const { fileName, variant, width, height, borderRadius, placeholder, imageLoadedCallback, children, multipleImages, ...restOfProps } = props;
  // const isMounted = useRef(false);
  const [imgUrl, setImgUrl] = useState(undefined);
  const [dimensions, setDimensions] = useState({width: 0, height: 0, borderRadius: 0});

  const showPlaceholder = (absolute) => {
    if(typeof(placeholder) === 'function') {
      return placeholder(dimensions.width, dimensions.height, absolute);
    } else {
      return renderPlaceholder(dimensions.width, dimensions.height, dimensions.borderRadius, absolute);
    }
  }

  useEffect(() => {
    const deviceDimensions = calcDimensions();
    // Default width is width of Image OR device width
    let imageWidth = width || deviceDimensions.width;
    if(width > deviceDimensions.width) {
      imageWidth = deviceDimensions.width;
    }
    // Default Height is calculated badsed on scaled down width
    let imageHeight = (height / width) * imageWidth;

    // Default border radius is 0
    let imageBorderRadius = 0;

    if(variant === 'square') {
      // If a square, make height = width
      imageHeight = imageWidth;
    } else if (variant === 'rounded') { 
      // If we're rounding corners, come up with a default border radius
      imageBorderRadius = imageWidth / 4;
    } else if (variant === 'circle') {
      // If the image is a circle, set the border radius to half the width and height = width
      imageBorderRadius = width / 2;
      imageHeight = imageWidth;
    }

    // Set the dimensions in State 
    setDimensions({
      width: imageWidth,
      height: imageHeight,
      borderRadius: borderRadius || imageBorderRadius
    });
  }, [width, height, borderRadius, variant]);

  useEffect(() => {
    const loadImg = async () => {
      let mounted = true;
      // console.log("-- Filename --", fileName);
      const cacheFileUri = `${FileSystem.cacheDirectory}${fileName}`;
      let imgXistsInCache = await findImageInCache(cacheFileUri);
      // console.log("-- Cache of Image --", imgXistsInCache);

      if (imgXistsInCache.exists) {
        // console.log("cached!", cacheFileUri);
        if(mounted) {
          setImgUrl(cacheFileUri);
          if(imageLoadedCallback) {
            imageLoadedCallback();
          }
        }
      } else {
        // console.log("not cached, let's cache it!");
        let cached = await cacheImage(fileName, cacheFileUri, () => {});
        // console.log("-- cacehd image --", cached);
        if (cached.cached) {
          // console.log('-- New Image Added to Cache --', cached);
          if(mounted) {
            setImgUrl(cached.path.uri);
            if(imageLoadedCallback) {
              imageLoadedCallback();
            }
          }
        } else {
          // console.log('-- Couldn\'t Cache Image --', cached);
        }
      }
    }

    loadImg();
    // return () => (isMounted.current = false);
    return () => mounted = false;
  }, [fileName]);

  if (fileName) {
    return (
      <>
        {imgUrl && imgUrl.slice(-9) !== "undefined" ? (
          <ImageBackground 
            source={{ uri: imgUrl }} 
            style={{ width: dimensions.width, height: dimensions.height }}
            imageStyle={{ borderRadius: dimensions.borderRadius }}
            resizeMode={multipleImages ? 'contain' : 'cover'}
            loadingIndicatorSource={() => showPlaceholder(false)}
            {...restOfProps}
          >
            {children}
          </ImageBackground>
        ) : (
          showPlaceholder(false)
        )}
      </>
    );
  }
  return showPlaceholder(false);
};

export default ImageS3;