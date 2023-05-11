import React, { memo, useMemo, useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import _ from "lodash";
import {
  Icon,
  ImageS3,
  ConditionalWrapper,
  DoubleTap,
  ZoomableView,
} from "../../components";
import { calcDimensions } from "../../styles";
import { AuthContext } from "../../contexts";
import { DataStore } from "../../utils/";
import { AdminFavorites } from "../../models";
import styles from "./ImageScrollStyles";

const dimensions = calcDimensions();

const ImageScroll = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const authStatus = useContext(AuthContext).authStatus;
  const [imageDimensions, setImageDimensions] = useState({minHeight: 0, maxHeight: 0, minWidth: 0, maxWidth: 0});
  const [adminFavoritedImages, setAdminFavoritedImages] = useState([]);

  const { images, previewMode, doubleTapHandler, singleTapHandler, tapDelay, adminFavorites } = props;
  if (!images || images.length === 0) {
    return null;
  }

  // Building a process to intercept double-taps for Admins to like individual Images
  const handleDoubleTap = async (img) => {    
    if(authStatus.isAdmin) {
      if (adminFavoritedImages.includes(img.url)) {
        const adminFavoriteId = adminFavorites.find((fav) => fav.url === img.url).id;
        try {
          await DataStore.delete(AdminFavorites, adminFavoriteId);
        } catch (error) {
          console.log("Error deleting Admin Favorite", error);
        }
      } else {
        try {
          await DataStore.save(
            new AdminFavorites({
              image: JSON.stringify(img)
            })
          );
          // console.log("Comment saved successfully!");
        } catch (error) {
          console.log("Error saving Admin Favorite", error);
        }
      }
    } else {
      doubleTapHandler();
    }
  }
  
  useEffect(() => {
    // Get the largest height value from array of objects in images
    const maxHeight = _.maxBy(images, "height").height;
    const minHeight = _.minBy(images, "height").height;
    const maxWidth = _.maxBy(images, "width").width;
    const minWidth = _.minBy(images, "width").width;
  
    setImageDimensions({minHeight, maxHeight, minWidth, maxWidth});
  }, [images]);

  useEffect(() => {
    if(adminFavorites) {
      const adminFavoriteURLs = adminFavorites.map((fav) => fav.url);
      const favoritedImages = images.filter((img) => {
        return adminFavoriteURLs.includes(img.url);
      }).map((img) => img.url);
      setAdminFavoritedImages(favoritedImages);
    };
  }, [adminFavorites, images]);

  return (
    <View style={ss.imageWrapper}>
      <ConditionalWrapper
        condition={!previewMode}
        wrapper={(children) => (
          <ZoomableView maxZoom={10} style={ss.zoomWrapper} height={dimensions.width * (images[0].height / images[0].width)} width={dimensions.width}>{children}</ZoomableView>
        )}>
        <ConditionalWrapper
          condition={images.length > 1}
          wrapper={(children) => (
            <ScrollView horizontal pagingEnabled>{children}</ScrollView>
          )}>
          {images.map((image, index) => {
            return (
              <ConditionalWrapper
              condition={doubleTapHandler && singleTapHandler && tapDelay}
              key={index}
              wrapper={(children) => (
                <DoubleTap doubleTap={() => handleDoubleTap(image)} singleTap={singleTapHandler} delay={tapDelay} key={index}>{children}</DoubleTap>
              )}>
                <ImageS3
                  fileName={image.url}
                  height={imageDimensions.minHeight || image.height}
                  width={imageDimensions.maxWidth || image.width}
                  multipleImages
                  key={index}
                >
                  <>
                    <View style={{position: 'absolute', right: 10, top: 10}} onPress={() => console.log('-- Press --')}>
                      <Icon name={adminFavoritedImages.includes(image.url) ? "heart" : "heartOutline"} size={24} color={theme.colors.red} />
                    </View>
                    {images.length > 1 && (
                      <View style={ss.imageScrollIndicatorWrapper}>
                        {images.map((i, idx) => {
                          return (
                            <Icon name="circle" size={12} key={idx} color={idx === index ? theme.colors.primary : theme.colors.onPrimary} />
                          );
                        })}
                      </View>
                    )}
                  </>
                </ImageS3>
              </ConditionalWrapper>
            );
          })}
        </ConditionalWrapper>
      </ConditionalWrapper>
    </View>
  );
};

export default memo(ImageScroll);
