import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
} from 'react-native';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import CameraRollComponent from './dist';
import { hasAndroidPermission } from './src/utils';

function App(): React.JSX.Element {
  const [isPermission, setIsPermission] = useState<boolean>(false);
  const [media, setMedia] = useState<PhotoIdentifier[]>([]);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    if (Platform.OS === "android") {
      if (await hasAndroidPermission()) {
        setIsPermission(true);
      }else{
        setIsPermission(false);
      }
    }
  }

  return (
    <SafeAreaView>
      {
        isPermission && (
          <CameraRollComponent
            assetType="All"
            onSelected={async (photoIdentifier) => {
              setMedia(photoIdentifier);
            }}
          />
        )
      }
    </SafeAreaView>
  );
}


export default App;
