import { Component, OnInit } from '@angular/core';
import { RandomService } from '../random-service.service';
import { ExportService } from '../export.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waifu-output',
  templateUrl: './waifu-output.component.html',
  styleUrls: ['./waifu-output.component.css']
})
export class WaifuOutputComponent implements OnInit {

  constructor(private randomService: RandomService, private router: Router, private exportService: ExportService) { }

  display = false;

  name = null;
  birthday = 'March 19';
  age = 18;
  occupation = null;
  height = 100;
  bust = 'C';
  weight = 65;
  details = [];
  personality = null;
  hairColor = null;
  hairStyle = null;
  eyeColor = 'Brown';
  skintone = null;
  species = 'Human';

  // Call the service to grab the values of the new Waifu and apply them to HTML
  getWaifu() {
    this.name = this.randomService.myWaifu.firstName + ' ' + this.randomService.myWaifu.lastName;
    this.age = this.randomService.myWaifu.age;
    this.occupation = this.randomService.myWaifu.occupation;
    this.personality = this.randomService.myWaifu.personality;
    this.hairColor = this.randomService.myWaifu.haircolor;
    this.hairStyle = this.randomService.myWaifu.hairstyle;
    this.skintone = this.randomService.myWaifu.skintone;
    this.eyeColor = this.randomService.myWaifu.eyecolor;
    this.height = this.randomService.myWaifu.height;
    this.bust = this.randomService.myWaifu.bust;
    this.weight = this.randomService.myWaifu.weight;
    this.details = this.randomService.myWaifu.extras;
    this.species = this.randomService.myWaifu.species;
    this.birthday = this.randomService.myWaifu.birthday;
    this.display = this.randomService.displayWaifu;

  }

  // Reroll a new waifu with the same parameters in the form field.
  rerollWaifu() {
    this.display = false;
    console.log('Rerolling!');
    this.randomService.makeWaifu();
    this.getWaifu();
  }

  newWaifu() {
    this.router.navigateByUrl('');
  }

  saveWaifu() {
    this.exportService.save();
  }

  ngOnInit() {
    this.getWaifu();
  }

}
