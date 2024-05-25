import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MediaItemProps {
    item: PhotoIdentifier;
    isActive: boolean;
    onPress: (item: PhotoIdentifier) => void;
    activeColor: string;
    activeIndex: number;
    THUMBNAIL_SIZE: number;
    fontFamily?: string;
}

const MediaItem = React.memo(({
    item,
    isActive,
    onPress,
    activeColor,
    activeIndex,
    THUMBNAIL_SIZE,
    fontFamily
}: MediaItemProps) => {
    const { uri } = item.node.image;
    const type = item.node.type;

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)} activeOpacity={0.8}>
            <Image source={{ uri }} style={{ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE }} resizeMode="cover" />
            <View style={[
                styles.imageOverlay,
                { width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE, borderColor: isActive ? activeColor : 'transparent', backgroundColor: isActive ? '#00000033' : 'transparent' }
            ]}>
                <View style={styles.typeBox}>
                    <Text allowFontScaling={false} style={[styles.typeText, { fontFamily: fontFamily }]}>{type}</Text>
                </View>
            </View>

            {
                isActive && (
                    <View style={{ backgroundColor: isActive ? activeColor : 'transparent', position: 'absolute', top: 5, right: 5, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: 'bold', color: '#ffffff', fontFamily: fontFamily }}>{activeIndex}</Text>
                    </View>
                )
            }
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    imageOverlay: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        borderWidth: 3,
    },
    typeBox: {
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        paddingTop: 2,
        paddingBottom: 3,
        paddingHorizontal: 6,
        marginBottom: 1,
        marginRight: 1,
    },
    typeText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 8,
    },
    itemContainer: {
        margin: 2,
        borderRadius: 2,
    },
});

export default MediaItem;
