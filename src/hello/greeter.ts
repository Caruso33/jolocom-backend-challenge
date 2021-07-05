import { injectable } from 'inversify'

@injectable()
export class Greeter {
  hello(thingToGreet: string) {
    return `Hello ${thingToGreet}!`
  }
}
