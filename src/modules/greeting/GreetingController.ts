import { get, prefix } from 'vovk';
import GreetingService from './GreetingService';

@prefix('greeting')
export default class GreetingController {
  @get('hello', { cors: true })
  static getGreeting() {
    return GreetingService.getGreeting();
  }

  @get('hello-stream', { cors: true })
  static async *streamGreeting() {
    yield* GreetingService.streamGreeting();
  }
}
