```
@react-native-camera-roll/camera-roll
```


```tsx
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";

const [media, setMedia] = useState<PhotoIdentifier[]>([]);
const maxWidth = 200; // 최대 너비
const maxHeight = 200; // 최대 높이

<TouchableOpacity style={{ padding: 40 }} onPress={async () => {
    console.log('media : ', media)
}}>
    <Text>리사이즈</Text>
</TouchableOpacity>

<CameraRollComponent
    assetType="All"
    onSelected={async (photoIdentifier) => {
        setMedia(photoIdentifier);
    }}
/>
```