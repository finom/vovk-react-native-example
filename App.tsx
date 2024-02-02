import { GreetingController } from '@vovkts/client';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import type { VovkClientReturnType, VovkClientYieldType } from 'vovk';
import 'react-native-polyfill-globals/auto';
import "@azure/core-asynciterator-polyfill";

export default function App() {
  const [greetingResponse, setGreetingResponse] = useState<VovkClientReturnType<typeof GreetingController.getGreeting>>();
  const [streamTokens, setStreamTokens] = useState<VovkClientYieldType<typeof GreetingController.streamGreeting>[]>([])
  
  return (
    <View style={styles.container}>
      <Button 
        title="Get Greeting" 
        onPress={async () => {
          setGreetingResponse(await GreetingController.getGreeting());
        }}
      />
      <Text>{greetingResponse?.greeting}</Text>
      <Button title="Get Streamed Greeting"
        onPress={async () => {
          setStreamTokens([]);
          for await (const token of await GreetingController.streamGreeting({
            // https://www.npmjs.com/package/react-native-fetch-api
            reactNative: { textStreaming: true }
          })) {
            console.log(token);
            setStreamTokens(prev => [...prev, token]);
          }
        }}
      />
      <Text>{streamTokens.map((token, i) => token.message).join('')}</Text>
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
});
