import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})

export class TableFilterPipe implements PipeTransform {

  transform(items: any, searchValue: any): any {
    if (!items) { return []; }
    if (!searchValue) { return items; }
    return items.filter(item => {
      return item.titleName.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()) ||
        item.albumName.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()) ||
        item.composerName.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()) ||
        item.artistName.toLowerCase().includes(searchValue.trim().toLocaleLowerCase());
    });
  }

}
