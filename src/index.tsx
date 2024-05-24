import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, ActivityIndicator, Dimensions } from 'react-native';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import MediaItem from './ui/MediaItem';

interface CameraRollComponentProps {
    assetType: 'Photos' | 'Videos' | 'All';
    loadingComponent?: React.ReactNode;
    activeColor?: string;
    fontFamily?: string;
    width?: number;
    onSelected?: (photoIdentifier: PhotoIdentifier[]) => void;
};

const CameraRollComponent = ({
    assetType,
    loadingComponent = <ActivityIndicator color={'#0000ff'} style={{ padding: 20 }} />,
    activeColor = '#0000ff99',
    fontFamily,
    width = Dimensions.get('window').width - 40,
    onSelected
}: CameraRollComponentProps) => {
    const THUMBNAIL_SIZE = (width - 13) / 3;
    const [media, setMedia] = useState<PhotoIdentifier[]>([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState<string | undefined>(undefined);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [uriList, setUriList] = useState<Set<PhotoIdentifier>>(new Set());

    const loadMedia = useCallback(async () => {
        if (loading || !hasNextPage) return;

        setLoading(true);
        try {
            const { edges, page_info } = await CameraRoll.getPhotos({
                first: 20,
                assetType: assetType,
                after: cursor ?? undefined,
            });

            setMedia(prevMedia => [...prevMedia, ...edges]);
            setCursor(page_info.end_cursor ?? undefined);
            setHasNextPage(page_info.has_next_page);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [assetType, cursor, hasNextPage, loading]);

    useEffect(() => {
        loadMedia();
    }, [loadMedia]);

    const handlePress = useCallback((uri: PhotoIdentifier) => {
        setUriList(prev => {
            const newSet = new Set(prev);
            if (newSet.has(uri)) {
                newSet.delete(uri);
            } else {
                newSet.add(uri);
            }

            if (onSelected) {
                onSelected(Array.from(newSet));
            }
            return newSet;
        });
    }, []);

    const renderItem = useCallback(({ item }: { item: PhotoIdentifier; }) => {
        const isActive = uriList.has(item);
        const activeIndex = (Array.from(uriList).indexOf(item)) + 1;

        return (
            <MediaItem item={item} isActive={isActive} onPress={handlePress} activeColor={activeColor} activeIndex={activeIndex} THUMBNAIL_SIZE={THUMBNAIL_SIZE} fontFamily={fontFamily} />
        );
    }, [handlePress, uriList, activeColor]);

    const keyExtractor = useCallback((item: PhotoIdentifier, index: number) => index.toString(), []);

    return (
        <View style={{ width: width }}>
            <FlatList
                data={media}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={3}
                onEndReached={loadMedia}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <>{loadingComponent}</> : null}
                initialNumToRender={20}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
        </View>
    );
};

export default CameraRollComponent;
