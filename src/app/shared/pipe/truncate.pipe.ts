import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {
    const length = _.toInteger((value.length / 100) * 50);
    return _.truncate(value, { length: length > 50 ? length : 50 });
  }
}
