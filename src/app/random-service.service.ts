import { Injectable } from '@angular/core';
import { Waifu } from './waifu';
import { Router } from '@angular/router';

import americanNames from '../assets/americanNames.json';
import europeanNames from '../assets/europeanNames.json';
import japaneseNames from '../assets/japaneseNames.json';

import personalities from '../assets/personalities.json';
import bodyFeatures from '../assets/bodyFeatures.json';
import occupations from '../assets/occupations.json';
import otherFeatures from '../assets/otherFeatures.json';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  myWaifu = new Waifu();

  adultContentEnabled = false;
  regionType: number;
  realismType: number;
  displayWaifu = false;

  nameJSON = null;
  occupationJSON = occupations;
  personalityJSON = personalities;
  featuresJSON = bodyFeatures;
  otherFeaturesJSON = otherFeatures;

  constructor(private router: Router) { }

  // Get the basic parameters from the waifu-init component
  recieveParams(region: number, realism: number, adult: boolean) {
    this.regionType = region;
    this.realismType = realism;
    this.adultContentEnabled = adult;

    this.getNameDataFromAssets();

    this.makeWaifu();
  }

  getNameDataFromAssets() {
    // Check the region selected for names and apply the appropriate JSON data to the nameJSON variable.
    switch (this.regionType.valueOf()) {
      default:
        console.log(`Nope, that didn't work.`);
        break;
      case 1:
        this.nameJSON = americanNames;
        break;
      case 2:
        this.nameJSON = europeanNames;
        break;
      case 3:
        this.nameJSON = japaneseNames;
        break;
    }
  }

  // After getting all of the required JSON files, append data to the myWaifu object
  makeWaifu() {
    this.makeName();
    this.makeBody();
    this.makeBirthday();
    this.makeJob();
    this.makeFeatures();
    this.displayWaifu = true;
    this.router.navigateByUrl('result');
  }

  // Appends a first and last name to the myWaifu object
  makeName() {
    this.myWaifu.firstName = this.nameJSON.firstNames[Math.floor(Math.random() * this.nameJSON.firstNames.length)].name;
    this.myWaifu.lastName = this.nameJSON.lastNames[Math.floor(Math.random() * this.nameJSON.lastNames.length)].name;
  }

  // Appends basic measurements, eye, and hair color to the myWaifu object
  makeBody() {

    // Determine min and max ranges for certain measurements based on realism value
    // All values are metric-based
    const bustMin = 75;
    const bustMax = 90 + (this.realismType * 6);

    const heightMin = 150;
    const heightMax = 180 + (this.realismType * 3);

    const weightMin = 61;
    const weightMax = 70 - (this.realismType * 2);


    this.myWaifu.bust = Math.floor(Math.random() * (bustMax - bustMin + 1) + bustMin);
    this.myWaifu.height = Math.floor(Math.random() * (heightMax - heightMin + 1) + heightMin);
    this.myWaifu.weight = Math.floor(Math.random() * (weightMax - weightMin + 1) + weightMin);
    this.myWaifu.age = Math.floor(Math.random() * (32 - 20 + 1) + 20);

    this.myWaifu.skintone = this.featuresJSON.skinTone[Math.floor(Math.random() * (this.featuresJSON.skinTone.length))].type;

    // If the regionType is Japanese and realistic, make hair only be a certain color
    if (this.regionType === 3 && this.realismType !== 3) {
      this.myWaifu.hairstyle = this.featuresJSON.jpHairStyles[Math.floor(Math.random() * (this.featuresJSON.jpHairStyles.length))].type;
      this.myWaifu.haircolor = this.featuresJSON.jpHairColor[Math.floor(Math.random() * (this.featuresJSON.jpHairColor.length))].type;
    } else if (this.regionType === 3 && this.realismType === 3) {
      this.myWaifu.hairstyle = this.featuresJSON.jpHairStyles[Math.floor(Math.random() * (this.featuresJSON.jpHairStyles.length))].type;
      this.myWaifu.haircolor = this.featuresJSON.animeHairColor[Math.floor(Math.random() * (this.featuresJSON.animeHairColor.length))].type;
      this.myWaifu.eyecolor = this.featuresJSON.otherEyeColor[Math.floor(Math.random() * (this.featuresJSON.otherEyeColor.length))].type;
    } else if (this.realismType === 2) {
      this.myWaifu.hairstyle = this.featuresJSON.hairStyle[Math.floor(Math.random() * (this.featuresJSON.hairStyle.length))].type;
      this.myWaifu.haircolor = this.featuresJSON.animeHairColor[Math.floor(Math.random() * (this.featuresJSON.animeHairColor.length))].type;
      this.myWaifu.eyecolor = this.featuresJSON.otherEyeColor[Math.floor(Math.random() * (this.featuresJSON.otherEyeColor.length))].type;
    } else {
      this.myWaifu.hairstyle = this.featuresJSON.hairStyle[Math.floor(Math.random() * (this.featuresJSON.hairStyle.length))].type;
      this.myWaifu.haircolor = this.featuresJSON.hairColor[Math.floor(Math.random() * (this.featuresJSON.hairColor.length))].type;
      this.myWaifu.eyecolor = this.featuresJSON.eyeColor[Math.floor(Math.random() * (this.featuresJSON.eyeColor.length))].type;
    }

    if (this.realismType === 2 || this.realismType === 3) {
      this.myWaifu.species = this.featuresJSON.species[Math.floor(Math.random() * (this.featuresJSON.species.length))].type;
    } else {
      this.myWaifu.species = this.featuresJSON.earthSpecies[0].type;
    }

  }

  // Generate a random month/date
  makeBirthday() {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayMin = 1;
    const dayMax = 31;

    this.myWaifu.birthday = month[Math.floor(Math.random() * (month.length))] + ' ' + Math.floor(Math.random() * (dayMax - dayMin + 1) + dayMin);

  }

  // Generate a random job
  makeJob() {
    if (this.adultContentEnabled) {
      this.myWaifu.occupation = this.occupationJSON.nsfwOccupation[Math.floor(Math.random() * (this.occupationJSON.nsfwOccupation.length))].occupation;
    } else {
      this.myWaifu.occupation = this.occupationJSON.earthOccupation[Math.floor(Math.random() * (this.occupationJSON.earthOccupation.length))].occupation;
    }
  }

  // Appends a series of features to the myWaifu object
  makeFeatures() {
    const extraArray = [];
    for (let i = 0; i < 4;) {
      const entryToBeAdded = this.otherFeaturesJSON.otherFeatures[Math.floor(Math.random() * (this.otherFeaturesJSON.otherFeatures.length))].feature;
      const checkIfDupe = extraArray.includes(entryToBeAdded);
      if (!checkIfDupe) {
        extraArray.push(entryToBeAdded);
        i++;
      }
    }
    if (this.realismType === 2) {
      for (let i = 0; i < 2;) {
        const entryToBeAdded = this.otherFeaturesJSON.semiRealFeatures[Math.floor(Math.random() * (this.otherFeaturesJSON.semiRealFeatures.length))].feature;
        const checkIfDupe = extraArray.includes(entryToBeAdded);
        if (!checkIfDupe) {
          extraArray.push(entryToBeAdded);
          i++;
        }
      }
    }
    if (this.realismType === 3) {
      for (let i = 0; i < 2;) {
        const entryToBeAdded = this.otherFeaturesJSON.animeFeatures[Math.floor(Math.random() * (this.otherFeaturesJSON.animeFeatures.length))].feature;
        const checkIfDupe = extraArray.includes(entryToBeAdded);
        if (!checkIfDupe) {
          extraArray.push(entryToBeAdded);
          i++;
        }
      }
    }
    if (this.adultContentEnabled) {
      for (let i = 0; i < 3; i++) {
        const entryToBeAdded = this.otherFeaturesJSON.adultFeatures[Math.floor(Math.random() * (this.otherFeaturesJSON.adultFeatures.length))].feature;
        const checkIfDupe = extraArray.includes(entryToBeAdded);
        if (!checkIfDupe) {
          extraArray.push(entryToBeAdded);
          i++;
        }
      }
    }

    this.myWaifu.extras = extraArray;
  }
}
