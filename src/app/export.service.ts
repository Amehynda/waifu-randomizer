import { Injectable } from '@angular/core';
import { Waifu } from './waifu';
import { RandomService } from './random-service.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportWaifu;

  constructor(private randomService: RandomService) { }

  save() {
    console.log('Saving...');
    console.log(this.randomService.myWaifu);
  }

  openFileDialog() {

  }
}
