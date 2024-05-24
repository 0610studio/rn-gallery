import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { Image } from 'react-native';
import ImageResizer, { Response as ImageResizerResponse } from 'react-native-image-resizer';

async function resizePhotos(
    photos: PhotoIdentifier[],
    maxWidth: number,
    maxHeight: number
): Promise<PhotoIdentifier[]> {
    const resizedPhotos: PhotoIdentifier[] = [];
    await Promise.all(
        photos.map(async (photo) => {
            try {
                // 이미지 정보
                const { node } = photo;
                if (node.type.includes('video')) return;

                const { uri } = node.image;
                let { width, height } = node.image;

                // 새로운 이미지 크기 계산
                let newWidth = maxWidth;
                let newHeight = maxHeight;

                if (!width || !height) {
                    const { width: getWidth, height: getHeight } = await getImageSize(uri);
                    width = getWidth;
                    height = getHeight;
                };

                const aspectRatio = width / height;
                if (aspectRatio > 1) {
                    newHeight = maxWidth / aspectRatio;
                } else {
                    newWidth = maxHeight * aspectRatio;
                }

                // 이미지 리사이즈
                const resizedImageUri = await resizeImage(uri, newWidth, newHeight);

                resizedPhotos.push({
                    node: {
                        ...node,
                        image: {
                            ...node.image,
                            filepath: resizedImageUri.path,
                            fileSize: resizedImageUri.size,
                            filename: resizedImageUri.name,
                            uri: resizedImageUri.uri,
                            height: newHeight,
                            width: newWidth
                        }
                    }
                });
            } catch (error) {
                console.error('Error resizing photo:', error);
            }
        })
    );

    return resizedPhotos;
}

// 이미지 크기 가져오기
function getImageSize(uri: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        Image.getSize(
            uri,
            (width, height) => {
                resolve({ width, height });
            },
            (error) => {
                reject(error);
            }
        );
    });
}


function resizeImage(uri: string, width: number, height: number): Promise<ImageResizerResponse> {
    return new Promise((resolve, reject) => {
        ImageResizer.createResizedImage(
            uri,
            width,
            height,
            'JPEG',
            90,
            0,
            undefined,
            true,
            {
                mode: 'contain',
            },
        ).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });
}

export default resizePhotos;
