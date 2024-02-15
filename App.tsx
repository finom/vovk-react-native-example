import { GreetingController } from 'vovk-client';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, Pressable } from 'react-native';
import type { VovkClientReturnType, VovkClientYieldType } from 'vovk';

if(Platform.OS !== 'web') {
  import('react-native-polyfill-globals/auto');
  import('@azure/core-asynciterator-polyfill');
}

export default function App() {
  const [greetingResponse, setGreetingResponse] = useState<VovkClientReturnType<typeof GreetingController.getGreeting>>();
  const [streamTokens, setStreamTokens] = useState<VovkClientYieldType<typeof GreetingController.streamGreeting>[]>([])
  return (
    <View style={styles.container}>
      <View>
        <Pressable 
          style={styles.pressable}
          onPress={async () => {
            setGreetingResponse(await GreetingController.getGreeting());
          }}
        >
          <Text>Get Greeting</Text>
        </Pressable>
        <Text style={styles.text}>{greetingResponse?.greeting}</Text>
      </View>
      <View style={styles.streamView}>
        <Pressable
          style={styles.pressable}
          onPress={async () => {
            setStreamTokens([]);
            for await (const token of await GreetingController.streamGreeting({
              // https://www.npmjs.com/package/react-native-fetch-api
              reactNative: { textStreaming: true }
            })) {
              setStreamTokens(prev => [...prev, token]);
            }
          }}
        >
          <Text>Get Streamed Greeting</Text>
        </Pressable>
        <Text style={styles.text}>{streamTokens.map((token, i) => token.message).join('')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streamView: { marginTop: 20 },
  text: { textAlign: 'center' },
  pressable: { 
    padding: 10, 
    backgroundColor: 'lightblue', 
    margin: 10, 
    borderRadius: 6 
  }
});
