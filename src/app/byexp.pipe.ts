import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byexp'
})
export class ByexpPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
