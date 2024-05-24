```
@react-native-camera-roll/camera-roll
```

```tsx
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";

const [media, setMedia] = useState<PhotoIdentifier[]>([]);

<CameraRollComponent
    assetType="All"
    onSelected={async (photoIdentifier) => {
        setMedia(photoIdentifier);
    }}
/>
```