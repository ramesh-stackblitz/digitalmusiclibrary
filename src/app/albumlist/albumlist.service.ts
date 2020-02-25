import { Injectable } from '@angular/core';
import { Albumlist } from '../model/album.model';
import { ALBUM_ITEMS } from '../data/albumlist-data';

@Injectable()
export class AlbumlistService {
  private pItems = ALBUM_ITEMS;

  getProductsFromData(): Albumlist[] {
    return this.pItems;
  }
}
