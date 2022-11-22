import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byfreelancerconnecter'
})
export class ByfreelancerconnecterPipe implements PipeTransform {
  transform(value: any, freelan: any): any {
    if (freelan == null) {
      return value;
    } else {
      return value.filter((item: any) => (item.freelance.id.includes(freelan))==(item.competence.freelance.includes(freelan)));
    }
  }

}
