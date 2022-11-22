import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'managejob'
})
export class ManagejobPipe implements PipeTransform {
  transform(value: any, managejob: any): any {
    if (managejob == null) {
      return value;
    } else {
      return value.filter((item: any) => (item.titre.includes(managejob)) || (item.specialite.includes(managejob)));
    }
  }

}
