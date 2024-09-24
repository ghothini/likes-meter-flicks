import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationVerify'
})
export class DurationVerifyPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const durationVerified = Number(value.split('')[0]) ? value : null;
    return durationVerified;
  }

}
