import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args: any[]): string {
     let x = '';
     if (value === null) {
       return '';
     }
     else{
       try{
         x=value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
       }
       catch(e){}
     }
     return x;
   }

}
