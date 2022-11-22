import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'candidature'
})
export class CandidaturePipe implements PipeTransform {
  transform(value: any, con: any): any {
    if (con == null) {
      return value;
    } else {
      return value.filter((item: any) => (item.offre.titre.includes(con)) || (item.date_creation.includes(con)));
    }
  }

}
