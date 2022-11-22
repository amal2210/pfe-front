import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'free'
})
export class FreePipe implements PipeTransform {

  transform(value: any, fre: any): any {
    if (fre == null) {
      return value;
    } else {
      return value.filter((item: any) => (item.AdresseFree.includes(fre)) );
    }
  }



}
