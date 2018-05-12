import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.substr(1)
    return (value.split("/"))[0];
  }

}
