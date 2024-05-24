import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import React from "react";
interface MediaItemProps {
    item: PhotoIdentifier;
    isActive: boolean;
    onPress: (item: PhotoIdentifier) => void;
    activeColor: string;
    activeIndex: number;
    THUMBNAIL_SIZE: number;
    fontFamily?: string;
}
declare const MediaItem: React.MemoExoticComponent<({ item, isActive, onPress, activeColor, activeIndex, THUMBNAIL_SIZE, fontFamily }: MediaItemProps) => React.JSX.Element>;
export default MediaItem;
//# sourceMappingURL=MediaItem.d.ts.map