import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exp'
})
export class ExpPipe implements PipeTransform {

  transform(value: any, exper: any): any {
    if (exper == null) {
      return value;
    } else {
      return value.filter((item: any) => (item.experience_offre.includes(exper)) );
    }
  }

}