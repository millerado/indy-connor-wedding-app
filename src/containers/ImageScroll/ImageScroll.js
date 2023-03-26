import React, { memo, useMemo, useState, useEffect } from "react";
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
import styles from "./ImageScrollStyles";

const dimensions = calcDimensions();

const ImageScroll = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [imageDimensions, setImageDimensions] = useState({minHeight: 0, maxHeight: 0, minWidth: 0, maxWidth: 0});

  const { images, previewMode, doubleTapHandler, singleTapHandler, tapDelay } = props;
  if (!images || images.length === 0) {
    return null;
  }
  
  useEffect(() => {
    // Get the largest height value from array of objects in images
    const maxHeight = _.maxBy(images, "height").height;
    const minHeight = _.minBy(images, "height").height;
    const maxWidth = _.maxBy(images, "width").width;
    const minWidth = _.minBy(images, "width").width;
  
    setImageDimensions({minHeight, maxHeight, minWidth, maxWidth});
  }, [images]);

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
                <DoubleTap doubleTap={doubleTapHandler} singleTap={singleTapHandler} delay={tapDelay} key={index}>{children}</DoubleTap>
              )}>
                <ImageS3
                  fileName={image.url}
                  height={imageDimensions.minHeight || image.height}
                  width={imageDimensions.maxWidth || image.width}
                  key={index}
                >
                  {images.length > 1 && (
                    <View style={ss.imageScrollIndicatorWrapper}>
                      {images.map((i, idx) => {
                        return (
                          <Icon name="circle" size={12} key={idx} color={idx === index ? theme.colors.primary : theme.colors.onPrimary} />
                        );
                      })}
                    </View>
                  )}
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
