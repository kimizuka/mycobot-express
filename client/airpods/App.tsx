import axios from 'axios'; // 簡単にPOSTするために追加
import React, {
  useEffect,
  useRef, // 500ms間を開けるために追加
  useState,
} from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {
  requestPermission,
  onDeviceMotionUpdates,
  startListenDeviceMotionUpdates,
  stopDeviceMotionUpdates,
} from 'react-native-headphone-motion';

const API_URL = 'http://192.168.86.200:3000'; // POSTするURLを入れる

export default function App() {
  const lastUpdateTimeRef = useRef<number>(0); // 最後の更新時刻を保持するために追加
  const [pitch, setPitch] = useState(0);
  const [pitchDeg, setPitchDeg] = useState(0);
  const [roll, setRoll] = useState(0);
  const [rollDeg, setRollDeg] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [yawDeg, setYawDeg] = useState(0);
  const [gravityX, setGravityX] = useState(0);
  const [gravityY, setGravityY] = useState(0);
  const [gravityZ, setGravityZ] = useState(0);
  const [rotationRateX, setRotationRateX] = useState(0);
  const [rotationRateY, setRotationRateY] = useState(0);
  const [rotationRateZ, setRotationRateZ] = useState(0);
  const [userAccelerationX, setUserAccelerationX] = useState(0);
  const [userAccelerationY, setUserAccelerationY] = useState(0);
  const [userAccelerationZ, setUserAccelerationZ] = useState(0);

  useEffect(() => {
    const delay = 500; // 更新間隔を変数にいれておく
    const handleDeviceMotionUpdates = onDeviceMotionUpdates(data => {
      if (Date.now() - lastUpdateTimeRef.current < delay) {
        // 更新間隔に満たない場合にリターン
        return;
      }

      // Webサーバにセンサ値をPOST
      // 成功しても失敗してもlastUpdateTimeRefを更新
      // なんとなくawaitは使用せず
      axios
        .post(String(API_URL), {
          pitch: data.attitude.pitchDeg || 0,
          roll: data.attitude.rollDeg || 0,
          yaw: data.attitude.yawDeg || 0,
        })
        .then(() => {
          lastUpdateTimeRef.current = Date.now();
        })
        .catch(err => {
          console.error(err);
          lastUpdateTimeRef.current = Date.now();
        });

      setPitch(data.attitude.pitch);
      setPitchDeg(data.attitude.pitchDeg);
      setRoll(data.attitude.roll);
      setRollDeg(data.attitude.rollDeg);
      setYaw(data.attitude.yaw);
      setYawDeg(data.attitude.yawDeg);
      setGravityX(data.gravity.x);
      setGravityY(data.gravity.y);
      setGravityZ(data.gravity.z);
      setRotationRateX(data.rotationRate.x);
      setRotationRateY(data.rotationRate.y);
      setRotationRateZ(data.rotationRate.z);
      setUserAccelerationX(data.userAcceleration.x);
      setUserAccelerationY(data.userAcceleration.y);
      setUserAccelerationZ(data.userAcceleration.z);
    });

    return () => {
      handleDeviceMotionUpdates.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title={'requestPermission'}
        onPress={async () => {
          await requestPermission();
        }}
      />
      <Button
        title={'startListenDeviceMotionUpdates'}
        onPress={async () => {
          await startListenDeviceMotionUpdates();
        }}
      />
      <Button
        title={'stopDeviceMotionUpdates'}
        onPress={async () => {
          await stopDeviceMotionUpdates();
        }}
      />
      <Text>{`pitch: ${pitch}`}</Text>
      <Text>{`pitchDeg: ${pitchDeg}`}</Text>
      <Text>{`roll: ${roll}`}</Text>
      <Text>{`rollDeg: ${rollDeg}`}</Text>
      <Text>{`yaw: ${yaw}`}</Text>
      <Text>{`yawDeg: ${yawDeg}`}</Text>
      <Text>{`gravityX: ${gravityX}`}</Text>
      <Text>{`gravityY: ${gravityY}`}</Text>
      <Text>{`gravityZ: ${gravityZ}`}</Text>
      <Text>{`rotationRateX: ${rotationRateX}`}</Text>
      <Text>{`rotationRateY: ${rotationRateY}`}</Text>
      <Text>{`rotationRateZ: ${rotationRateZ}`}</Text>
      <Text>{`userAccelerationX: ${userAccelerationX}`}</Text>
      <Text>{`userAccelerationY: ${userAccelerationY}`}</Text>
      <Text>{`userAccelerationZ: ${userAccelerationZ}`}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});