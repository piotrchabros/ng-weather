import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export function polling( ) : MethodDecorator {
  return function (target: Function, key: string, descriptor: any) {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);

      return timer(0, 30000)
        .pipe(
          switchMap(() =>
            result
      ))
    }
    return descriptor;
  }
}
