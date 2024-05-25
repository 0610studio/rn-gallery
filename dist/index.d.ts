import React from 'react';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
interface CameraRollComponentProps {
    assetType: 'Photos' | 'Videos' | 'All';
    loadingComponent?: React.ReactNode;
    activeColor?: string;
    fontFamily?: string;
    width?: number;
    onSelected?: (photoIdentifier: PhotoIdentifier[]) => void;
    emptyComponent?: React.ReactNode;
    maxCount?: number;
    maxCountHandler?: () => void;
}
declare const CameraRollComponent: ({ assetType, loadingComponent, activeColor, fontFamily, width, onSelected, emptyComponent, maxCount, maxCountHandler }: CameraRollComponentProps) => React.JSX.Element;
export default CameraRollComponent;
//# sourceMappingURL=index.d.ts.map