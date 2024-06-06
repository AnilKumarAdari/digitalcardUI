import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber',
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return value
      .match(/.{1,4}/g)
      ?.toString()
      .replaceAll(',', '-');
  }
}
