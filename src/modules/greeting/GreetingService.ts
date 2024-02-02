export type Token = { message: string };

export default class GreetingService {
  static getGreeting() {
    return { greeting: 'Hello world!' };
  }

  static async *streamGreeting() {
    const tokens: Token[] = [
      { message: 'Hello,' },
      { message: ' World' },
      { message: ' from' },
      { message: ' Stream' },
      { message: '!' },
    ];

    for (const token of tokens) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      yield token;
    }
  }
}
