

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import shuffleSeed from 'shuffle-seed';
import { useTheme } from 'react-native-paper';
import { typography } from '../../styles';
import Text from '../Text/Text';
import ImageS3 from '../ImageS3/ImageS3';
import avatarColors from './AvatarColors';

interface AvatarProps {
  fileName?: string;
  name?: string;
  size?: number;
  variant?: 'rounded' | 'circle' | 'square';
  textSize?: number;
  bold?: boolean;
  height?: number;
  absolute?: boolean;
  imageLoadedCallback?: () => void;
}

const Avatar = (props: AvatarProps) => {
  const theme = useTheme();
  const [staticColors, setStaticColors] = useState({color: theme.colors.primary, textColor: theme.colors.onSecondary});
  const [borderRadius, setBorderRadius] = useState(0);
  const [initials, setInitials] = useState('');

  const {
    fileName,
    name = '',
    size = typography.fontSizeXL,
    variant = 'rounded',
    textSize = typography.fontSizeM,
    bold = false,
    height,
    absolute = false,
    imageLoadedCallback
  } = props;

  useEffect(() => {
    const initialsArray = name.split(' ');
    let newInitials = initialsArray[0].charAt(0);
    if (initialsArray.length > 1) {
      newInitials += initialsArray[initialsArray.length - 1].charAt(0);
    }
    setInitials(newInitials);
    const possibleColors = avatarColors(theme);
    const randomColors = shuffleSeed.shuffle(possibleColors, name);
    setStaticColors(randomColors[0]);
  }, [name, theme]);

  useEffect(() => {
    if(variant === 'square') {
      setBorderRadius(0);
    } else if (variant === 'rounded') { 
      setBorderRadius(size / 4);
    } else if (variant === 'circle') {
      setBorderRadius(size / 2);
    }
  }, [size, variant]);

  const renderPlaceholder = (placeholderWidth, placeholderHeight) => {
    return renderInitials(placeholderWidth, borderRadius, staticColors, initials, textSize, bold, placeholderHeight, absolute)
  }

  if (fileName) {
    // console.log('-- Avatar has File Name --', fileName, size, height, borderRadius);
    return (
      <ImageS3
        fileName={fileName}
        width={size}
        height={ height || size}
        borderRadius={borderRadius}
        placeholder={() => renderPlaceholder(size, height || size)}
        variant={variant}
        imageLoadedCallback={imageLoadedCallback}
      />
    );
  }

  return renderPlaceholder(size, height || size);
}

export default Avatar;

const renderInitials = (size, borderRadius, staticColors, initials, textSize, bold, height, absolute) => {
  return (
    <View style={{position: absolute ? 'absolute' : 'relative', backgroundColor: initials !== '' ? staticColors.color : undefined, width: size, height: height || size, alignItems: 'center', justifyContent: 'center', borderRadius: borderRadius, overflow: 'hidden'}}>
      <Text color={staticColors.textColor} size={textSize} bold={bold}>
        {initials}
      </Text>
    </View>
  );
}