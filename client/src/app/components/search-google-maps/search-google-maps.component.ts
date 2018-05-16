import { Component, Output, EventEmitter, ElementRef, NgZone, ViewChild, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: "app-search-google-maps",
  templateUrl: "./search-google-maps.component.html",
  styleUrls: ["./search-google-maps.component.scss"]
})
export class SearchGoogleMapsComponent implements OnInit {
  
  searchControl: FormControl;
  direction:Object = {
    lat:Number
  }
  latitude: number;
  longitude: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  ngOnInit(){
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log(place)

          this.direction = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  
 
}
