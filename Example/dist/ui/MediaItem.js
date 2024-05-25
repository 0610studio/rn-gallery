import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
var MediaItem = React.memo(function (_a) {
    var item = _a.item, isActive = _a.isActive, onPress = _a.onPress, activeColor = _a.activeColor, activeIndex = _a.activeIndex, THUMBNAIL_SIZE = _a.THUMBNAIL_SIZE, fontFamily = _a.fontFamily;
    var uri = item.node.image.uri;
    var type = item.node.type;
    return (<TouchableOpacity style={styles.itemContainer} onPress={function () { return onPress(item); }} activeOpacity={0.8}>
            <Image source={{ uri: uri }} style={{ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE }} resizeMode="cover"/>
            <View style={[
            styles.imageOverlay,
            { width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE, borderColor: isActive ? activeColor : 'transparent', backgroundColor: isActive ? '#00000033' : 'transparent' }
        ]}>
                <View style={styles.typeBox}>
                    <Text allowFontScaling={false} style={[styles.typeText, { fontFamily: fontFamily }]}>{type}</Text>
                </View>
            </View>

            {isActive && (<View style={{ backgroundColor: isActive ? activeColor : 'transparent', position: 'absolute', top: 5, right: 5, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: 'bold', color: '#ffffff', fontFamily: fontFamily }}>{activeIndex}</Text>
                    </View>)}
        </TouchableOpacity>);
});
var styles = StyleSheet.create({
    imageOverlay: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        borderWidth: 3,
    },
    typeBox: {
        justifyContent: 'center',
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
//# sourceMappingURL=MediaItem.js.map