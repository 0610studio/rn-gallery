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
}
declare const CameraRollComponent: ({ assetType, loadingComponent, activeColor, fontFamily, width, onSelected, emptyComponent }: CameraRollComponentProps) => React.JSX.Element;
export default CameraRollComponent;
//# sourceMappingURL=index.d.ts.map