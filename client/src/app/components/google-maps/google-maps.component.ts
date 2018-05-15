import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class MapsComponent {
  @Input() direction: any;
  lat: number = 51.678418;
  lng: number = 7.809007;
}