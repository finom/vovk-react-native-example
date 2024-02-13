import { get, prefix } from 'vovk';
import GreetingService from './GreetingService';

@prefix('greeting')
export default class GreetingController {
  private static greetingService = GreetingService;

  @get('hello', { cors: true })
  static getGreeting() {
    return this.greetingService.getGreeting();
  }

  @get('hello-stream', { cors: true })
  static async *streamGreeting() {
    yield* this.greetingService.streamGreeting();
  }
}
