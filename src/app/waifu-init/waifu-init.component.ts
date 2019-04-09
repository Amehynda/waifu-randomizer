import { Component, OnInit } from '@angular/core';
import { RandomService } from '../random-service.service';

@Component({
  selector: 'app-waifu-init',
  templateUrl: './waifu-init.component.html',
  styleUrls: ['./waifu-init.component.css']
})
export class WaifuInitComponent implements OnInit {

  // Set the name region, realism, and whether or not the user wants to view adult content
  nameRegion = [
    {
      label: 'American',
      id: 1,
    },
    {
      label: 'European',
      id: 2
    },
    {
      label: 'Japanese',
      id: 3
    }
  ];
  realismLevel = [
    {
      label: 'Realistic',
      id: 1
    },
    {
      label: 'Semi-Realistic',
      id: 2
    },
    {
      label: 'We Anime Now',
      id: 3
    }
  ];
  adultEnabled = false;
  selectedNameRegion = null;
  selectedRealismLevel = null;

  constructor(private randomService: RandomService) { }

  ngOnInit() {
    console.log('Time to make waifus and change lives.');
  }

  // Submit the form values to the RandomService
  onSubmit(): void {
    // console.log(this.selectedNameRegion + ' ' + this.selectedRealismLevel + ' ' + this.adultEnabled);
    this.randomService.recieveParams(parseInt(this.selectedNameRegion, 10), parseInt(this.selectedRealismLevel, 10), this.adultEnabled);
  }

}
