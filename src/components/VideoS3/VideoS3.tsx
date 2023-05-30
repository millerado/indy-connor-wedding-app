import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { Storage } from "aws-amplify";
import * as FileSystem from "expo-file-system";
import { setStatusBarHidden } from 'expo-status-bar';
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { calcDimensions } from "../../styles";
import ActivityIndicator from "../ActivityIndicator/ActivityIndicator";

const findVideoInCache = async (fileName) => {
  // console.log('-- findVideoInCache --', fileName);
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
};

const cacheVideo = async (fileName, cacheUri, callback) => {
  // console.log("Filename cache: ", fileName);
  try {
    const S3Url = await Storage.get(fileName);
    const downloadVideo = FileSystem.createDownloadResumable(
      S3Url,
      cacheUri,
      {},
      callback
    );

    const downloaded = await downloadVideo.downloadAsync();
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
};

const renderPlaceholder = (width, height, absolute) => {
  return (
    <View
      style={{
        position: absolute ? "absolute" : "relative",
        width: width,
        height: height || width,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={Math.min(width, height) * 0.5} />
    </View>
  );
};

const VideoS3 = (props) => {
  const {
    fileName,
    placeholder,
    videoLoadedCallback,
    height,
    width,
    ...restOfProps
  } = props;
  const [videoUrl, setVideoUrl] = useState(undefined);
  const [inFullscreen, setInFullsreen] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const refVideo = useRef(null);
  const dimensions = calcDimensions();
  const videoPreviewWidth = dimensions.width;
  const videoPreviewHeight = dimensions.width * 0.8;

  const showPlaceholder = (absolute) => {
    if (typeof placeholder === "function") {
      return placeholder(videoPreviewWidth, videoPreviewHeight, absolute);
    } else {
      return renderPlaceholder(videoPreviewWidth, videoPreviewHeight, absolute);
    }
  };

  useEffect(() => {
    const loadVideo = async () => {
      let mounted = true;
      // console.log("-- Filename --", fileName);
      const cacheFileUri = `${FileSystem.cacheDirectory}${fileName}`;
      let videoExistsInCache = await findVideoInCache(cacheFileUri);
      // console.log("-- Cache of Image --", videoExistsInCache);

      if (videoExistsInCache.exists) {
        // console.log("cached!", cacheFileUri);
        if (mounted) {
          setVideoUrl(cacheFileUri);
          if (videoLoadedCallback) {
            videoLoadedCallback();
          }
        }
      } else {
        // console.log("not cached, let's cache it!");
        let cached = await cacheVideo(fileName, cacheFileUri, () => {});
        // console.log("-- cacehd image --", cached);
        if (cached.cached) {
          // console.log('-- New Image Added to Cache --', cached);
          if (mounted) {
            setVideoUrl(cached.path.uri);
            if (videoLoadedCallback) {
              videoLoadedCallback();
            }
          }
        } else {
          // console.log('-- Couldn\'t Cache Image --', cached);
        }
      }
    };

    loadVideo();
    // return () => (isMounted.current = false);
    return () => (mounted = false);
  }, [fileName]);
  const displatHeight = inFullscreen ? (height / width) * dimensions.width : Math.min(videoPreviewHeight, (height / width) * dimensions.width);
  const displatWidth = inFullscreen ? dimensions.width : videoPreviewWidth;

  // console.log('-- FullScreen --', inFullscreen);
  // console.log('-- height, width --', height, width);
  // console.log('-- dimensions --', dimensions);
  // console.log('-- Video Preview Dimensions --', videoPreviewWidth, videoPreviewHeight);
  // console.log('-- Display Dimensions --', displatWidth, displatHeight);

  if (fileName) {
    return (
      <>
        {videoUrl && videoUrl.slice(-9) !== "undefined" ? (
          <VideoPlayer
            videoProps={{
              shouldPlay: false,
              resizeMode: ResizeMode.CONTAIN,
              // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
              source: {
                uri: videoUrl,
              },
              isMuted: isMute,
              ref: refVideo,
            }}
            // defaultControlsVisible={true}
            style={{
              videoBackgroundColor: inFullscreen ? 'black' : 'transparent',
              height: displatHeight,
              width: displatWidth,
            }}
            mute={{
              enterMute: () => setIsMute(!isMute),
              exitMute: () => setIsMute(!isMute),
              isMute,
            }}
            fullscreen={{
              inFullscreen: inFullscreen,
              enterFullscreen: async () => {
                setStatusBarHidden(true, 'fade')
                setInFullsreen(!inFullscreen)
                refVideo.current.setStatusAsync({
                  shouldPlay: true,
                })
              },
              exitFullscreen: async () => {
                setStatusBarHidden(false, 'fade')
                setInFullsreen(!inFullscreen)
              },
            }}
          />
        ) : (
          showPlaceholder(false)
        )}
      </>
    );
  }
  return showPlaceholder(false);
};

export default VideoS3;
