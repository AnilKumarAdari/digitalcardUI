import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchCard',
})
export class SearchCardPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal = val.cardId.toLocaleLowerCase().includes(args);
      return rVal;
    });
  }
}
