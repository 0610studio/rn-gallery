import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import { FlatList, View, ActivityIndicator, Dimensions, Text } from 'react-native';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import MediaItem from './ui/MediaItem';

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
    footerComponent?: (props: PhotoIdentifier[]) => ReactNode;
};

const CameraRollComponent = ({
    assetType,
    loadingComponent = <ActivityIndicator color={'#0000ff'} style={{ padding: 20 }} />,
    activeColor = '#0000ff99',
    fontFamily,
    width = Dimensions.get('window').width - 40,
    onSelected,
    emptyComponent,
    maxCount,
    maxCountHandler,
    footerComponent
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
    }, []);

    const handlePress = useCallback((uri: PhotoIdentifier) => {
        setUriList(prev => {
            const newSet = new Set(prev);
            if (newSet.has(uri)) {
                newSet.delete(uri);
            } else {
                if (maxCount && newSet.size >= maxCount) {
                    maxCountHandler?.();
                    return newSet;
                }
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
        <View style={{ width: width, flex: 1 }}>
            <FlatList
                data={media}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={3}
                onEndReached={loadMedia}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <>{loadingComponent}</> : null}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={3}
                ListEmptyComponent={<>
                    {emptyComponent ? emptyComponent
                        : <View style={{ padding: 50 }}><Text style={{ color: 'black', textAlign: 'center' }}>앨범이 비었거나, 권한이 없어요.</Text></View>}
                </>}
            />

            {footerComponent && footerComponent(Array.from(uriList))}
        </View>
    );
};

export default CameraRollComponent;
