import React, { memo, useMemo } from "react";
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

  const { images, previewMode, doubleTapHandler, singleTapHandler, tapDelay } = props;
  if (!images || images.length === 0) {
    return null;
  }

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
              wrapper={(children) => (
                <DoubleTap doubleTap={doubleTapHandler} singleTap={singleTapHandler} delay={tapDelay}>{children}</DoubleTap>
              )}>
                <ImageS3
                  fileName={images[index].url}
                  height={images[index].height}
                  width={images[index].width}
                  key={index}
                >
                  {images.length > 1 && (
                    <View style={ss.imageScrollIndicatorWrapper}>
                      {images.map((i, idx) => {
                        return (
                          <Icon name="circle" size={20} key={idx} color={idx === index ? theme.colors.primary : theme.colors.onPrimary} />
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
