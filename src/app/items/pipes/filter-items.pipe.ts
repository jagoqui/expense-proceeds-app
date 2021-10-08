import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/shared/models/expense-proceeds.model';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {
  transform(items: Item[]): Item[] {
    // return items.slice().sort((itemA, _) => (itemA.type === 'proceed' ? -1 : 1));
    // return [...items].sort((itemA, _) => (itemA.type === 'proceed' ? -1 : 1));
    return items.sort((itemA, _) => (itemA.type === 'proceed' ? -1 : 1));
  }
}
