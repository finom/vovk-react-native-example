# Vovk.ts with Expo

![Demo](https://github.com/finom/vovk-react-native-example/assets/1082083/853878d2-461b-467e-852c-c0e5149fe761)

This is a minimal proof of work of a React Native project that uses [Next.js](https://nextjs.org/) with [Vovk.ts](https://vovk.dev/) as back-end. At this example Expo and Next.js installed at the same folder in order to keep it as simple as possible. **/src** contains Next.js + Vovk.ts project and **App.tsx** contains RN code.

```ts
import { get, prefix } from 'vovk';
import GreetingService from './GreetingService';

@prefix('greeting')
export default class GreetingController {
  @get('hello', { cors: true })
  static getGreeting() {
    return GreetingService.getGreeting();
  }

  // ...
}
```

```tsx
import { GreetingController } from 'vovk-client';

// ...

<Pressable 
  onPress={async () => {
    setGreetingResponse(await GreetingController.getGreeting());
  }}
>
  <Text>Get Greeting</Text>
</Pressable>
<Text>{greetingResponse?.greeting}</Text>
```

## Prefix definition

In order to make it work locally on all platforms you need to define prefix at **vovk.config.js** that includes local IP address instead of relative path or localhost. The IP address below is used as an example and yours can be different. 

```ts
// vovk.config.js
const vovkConfig = {
    prefix: `http://192.168.1.2:${process.env.PORT}/api`,
};

module.exports = vovkConfig;
```

If you don't need Android support, simply use localhost.

To define production server use ternary expression checking `NODE_ENV` variable or override the prefix with `VOVK_PREFIX` variable if it's applicable.

## Run

Install deps with `npm i`.

Run one of the following commands:

- `npm run ios`
- `npm run android`
- `npm run web`

These NPM scripts run `vovk dev` and `expo start` in parallel using [concurrently](https://www.npmjs.com/package/concurrently). Please check **package.json** for more information.

## Notes

### Polyfills

In order to run fetch API and async generators you need to use the following polyfills:

```ts
if(Platform.OS !== 'web') {
  import('react-native-polyfill-globals/auto');
  import('@azure/core-asynciterator-polyfill');
}
```

### Streaming requirements

By default Vovk.ts determines wether it needs to use regular HTTP request handler or HTTP stream handler by checking `content-type` response header. With [fetch polyfill](https://www.npmjs.com/package/react-native-fetch-api) the `fetch` function needs to know in advance if it's going to be used to stream text. Vovk's default fetcher supports non-standard `reactNative: { textStreaming: true }` option out of the box as an extension for `RequestInit` interface that is accepted by all client methods. In other words, you need to provide this option every time when you need use text streaming.

```ts
for await (const token of await GreetingController.streamGreeting({
  reactNative: { textStreaming: true }
})) {
  // ...
}
```

Also note that text streaming [does not work properly in dev mode](https://github.com/react-native-community/fetch/issues/13#issuecomment-1703097655) on Android. It retruns all stream messages alltogether once the stream is done.

