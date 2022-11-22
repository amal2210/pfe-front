import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterjob'
})
export class FilterjobPipe implements PipeTransform {
  transform(value: any, FILJOB: any): any {
    if (FILJOB == null) {
      return value;
    } else {
      return value.filter((item: any) => (item.offre.entreprise.adresse.includes(FILJOB)) && (item.offre.titre.includes(FILJOB)));
    }
  }

}
