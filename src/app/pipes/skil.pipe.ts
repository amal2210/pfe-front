import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skil'
})
export class SkilPipe implements PipeTransform {

 transform(value: any, sk: any): any {
    if (sk == null) {
      return value;
    } else {
      return value.filter((item: any) => (item.skills.id.includes(sk))==(item.offre.skills.id.includes(sk)));
    }
  }

}
