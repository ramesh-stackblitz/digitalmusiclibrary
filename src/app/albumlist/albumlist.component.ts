import { Component, OnInit, OnChanges } from '@angular/core';
import { AlbumlistService } from './albumlist.service';
import { Albumlist } from '../model/album.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.scss']
})
export class AlbumlistComponent implements OnInit {

  albumlist: Albumlist[];
  albumListForm: boolean;
  editAlbumlistForm: boolean;
  isNewForm: boolean;
  newAlbumListForm: any = {};
  editedAlbumlist: any = {};
  imageUrl: any;
  isAdminFlag: boolean;
  isUserFlag: boolean;
  filterOption: string;
  searchValue: string;
  filterItems: any = [];
  albumlistLocal: any = [];
  constructor(private albumlistService: AlbumlistService, private activatedRoute: ActivatedRoute) {
    this.getAlbumList();
    this.updateResults();
  }

  ngOnInit() {
    
    const localValues = JSON.parse(localStorage.getItem(this.albumlistLocal));
    if (localValues.length > 0) {
      this.albumlist = JSON.parse(localStorage.getItem(this.albumlistLocal));
      this.filterItems = JSON.parse(localStorage.getItem(this.albumlistLocal));
    }

    this.albumListForm = false;
    this.editAlbumlistForm = false;
    this.filterOption = 'all';
    this.searchValue = '';

  }

  getAlbumList() {
    this.albumlist = this.albumlistService.getProductsFromData();
    this.filterItems = this.albumlist;
    this.isAdminFlag = this.activatedRoute.snapshot.params.isAdminFlag;
    this.isUserFlag = this.activatedRoute.snapshot.params.isUserFlag;
  }

  async updateResults() {
    this.filterItems = this.searchByValue(this.albumlist);
  }

  searchByValue(items) {
    return items.filter(item => {
      if (this.searchValue.trim() === '') {
        return true;
      } else {
        return item.titleName.toLowerCase().includes(this.searchValue.trim().toLocaleLowerCase()) ||
          item.albumName.toLowerCase().includes(this.searchValue.trim().toLocaleLowerCase()) ||
          item.composerName.toLowerCase().includes(this.searchValue.trim().toLocaleLowerCase()) ||
          item.artistName.toLowerCase().includes(this.searchValue.trim().toLocaleLowerCase());
      }
    });
  }

  showEditAlbumForm(albumlist: Albumlist) {
    if (!albumlist) {
      this.albumListForm = false;
      return;
    }
    this.editAlbumlistForm = true;
    const editVal = JSON.stringify(albumlist);
    this.editedAlbumlist = JSON.parse(editVal);
  }

  showAddAlbumForm() {
    if (this.albumlist.length) {
      this.newAlbumListForm = {};
    }
    this.albumListForm = true;
    this.isNewForm = true;
    this.editAlbumlistForm = false;
  }

  saveAlbumList(albumlist: Albumlist) {
    if (this.isNewForm) {
      this.filterItems.push(this.newAlbumListForm);
      localStorage.setItem(this.albumlistLocal, JSON.stringify(this.filterItems));
    }
    this.albumListForm = false;
    this.editAlbumlistForm = false;
  }

  updateAlbumlist(id) {
    const currentIndex = this.filterItems.findIndex((item) =>  item.id === id );
    this.filterItems.splice(currentIndex, 1, this.editedAlbumlist);
    localStorage.setItem(this.albumlistLocal, JSON.stringify(this.filterItems));
    this.editAlbumlistForm = false;
    this.editedAlbumlist = {};
  }

  removeAlbumList(index: any) {
    this.filterItems.splice(index, 1);
    localStorage.setItem(this.albumlistLocal, JSON.stringify(this.filterItems));
  }

  cancelNewAlbumList() {
    this.newAlbumListForm = {};
    this.albumListForm = false;
  }

  cancelEdits() {
    this.editedAlbumlist = {};
    this.editAlbumlistForm = false;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = ( val: any ) => {
        this.newAlbumListForm.thumnailImg = val.target.result;
      };
    }
  }
}
