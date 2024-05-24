var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, ActivityIndicator, Dimensions, Text } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import MediaItem from './ui/MediaItem';
;
var CameraRollComponent = function (_a) {
    var assetType = _a.assetType, _b = _a.loadingComponent, loadingComponent = _b === void 0 ? <ActivityIndicator color={'#0000ff'} style={{ padding: 20 }}/> : _b, _c = _a.activeColor, activeColor = _c === void 0 ? '#0000ff99' : _c, fontFamily = _a.fontFamily, _d = _a.width, width = _d === void 0 ? Dimensions.get('window').width - 40 : _d, onSelected = _a.onSelected, emptyComponent = _a.emptyComponent;
    var THUMBNAIL_SIZE = (width - 13) / 3;
    var _e = useState([]), media = _e[0], setMedia = _e[1];
    var _f = useState(false), loading = _f[0], setLoading = _f[1];
    var _g = useState(undefined), cursor = _g[0], setCursor = _g[1];
    var _h = useState(true), hasNextPage = _h[0], setHasNextPage = _h[1];
    var _j = useState(new Set()), uriList = _j[0], setUriList = _j[1];
    var loadMedia = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, edges_1, page_info, error_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (loading || !hasNextPage)
                        return [2];
                    setLoading(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4, CameraRoll.getPhotos({
                            first: 20,
                            assetType: assetType,
                            after: cursor !== null && cursor !== void 0 ? cursor : undefined,
                        })];
                case 2:
                    _a = _c.sent(), edges_1 = _a.edges, page_info = _a.page_info;
                    setMedia(function (prevMedia) { return __spreadArray(__spreadArray([], prevMedia, true), edges_1, true); });
                    setCursor((_b = page_info.end_cursor) !== null && _b !== void 0 ? _b : undefined);
                    setHasNextPage(page_info.has_next_page);
                    return [3, 5];
                case 3:
                    error_1 = _c.sent();
                    console.error(error_1);
                    return [3, 5];
                case 4:
                    setLoading(false);
                    return [7];
                case 5: return [2];
            }
        });
    }); }, [assetType, cursor, hasNextPage, loading]);
    useEffect(function () {
        loadMedia();
    }, []);
    var handlePress = useCallback(function (uri) {
        setUriList(function (prev) {
            var newSet = new Set(prev);
            if (newSet.has(uri)) {
                newSet.delete(uri);
            }
            else {
                newSet.add(uri);
            }
            if (onSelected) {
                onSelected(Array.from(newSet));
            }
            return newSet;
        });
    }, []);
    var renderItem = useCallback(function (_a) {
        var item = _a.item;
        var isActive = uriList.has(item);
        var activeIndex = (Array.from(uriList).indexOf(item)) + 1;
        return (<MediaItem item={item} isActive={isActive} onPress={handlePress} activeColor={activeColor} activeIndex={activeIndex} THUMBNAIL_SIZE={THUMBNAIL_SIZE} fontFamily={fontFamily}/>);
    }, [handlePress, uriList, activeColor]);
    var keyExtractor = useCallback(function (item, index) { return index.toString(); }, []);
    return (<View style={{ width: width }}>
            <FlatList data={media} renderItem={renderItem} keyExtractor={keyExtractor} numColumns={3} onEndReached={loadMedia} onEndReachedThreshold={0.5} ListFooterComponent={loading ? <>{loadingComponent}</> : null} initialNumToRender={20} maxToRenderPerBatch={10} windowSize={5} ListEmptyComponent={<>
                    {emptyComponent ? emptyComponent
                : <View style={{ padding: 50 }}><Text style={{ color: 'black', textAlign: 'center' }}>앨범이 비었거나, 권한이 없어요.</Text></View>}
                </>}/>
        </View>);
};
export default CameraRollComponent;
//# sourceMappingURL=index.js.map