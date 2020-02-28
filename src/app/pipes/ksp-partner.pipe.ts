import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kspPartner'
})
export class KspPartnerPipe implements PipeTransform {

  transform(items: any[], filter: any): any {    
    if (!items || filter.location=='All Cities') {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => item.location == filter.location);
  }

}
