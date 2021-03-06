import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class MapsComponent  implements OnInit {
  @Input() direction: any;
  lat: number;
  lng: number;
  zoom:number = 18;

  ngOnInit(){
  }
}