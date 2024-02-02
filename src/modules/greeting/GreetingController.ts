import { get, prefix } from 'vovk';
import GreetingService from './GreetingService';

@prefix('greeting')
export default class GreetingController {
  private static greetingService = GreetingService;

  @get('hello')
  static getGreeting() {
    return this.greetingService.getGreeting();
  }

  @get('hello-stream')
  static async *streamGreeting() {
    yield* this.greetingService.streamGreeting();
  }
}
