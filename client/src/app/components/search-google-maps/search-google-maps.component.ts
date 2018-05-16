import { Component, Output, EventEmitter, ElementRef, NgZone, ViewChild, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

interface Direction{
  lat:number,
  lng:number,
  address:string,
  city:string
}


@Component({
  selector: "app-search-google-maps",
  templateUrl: "./search-google-maps.component.html",
  styleUrls: ["./search-google-maps.component.scss"]
})


export class SearchGoogleMapsComponent implements OnInit {

  dir:Direction = {
    lat:0,
    lng:0,
    address:"",
    city:""
  };
  searchControl: FormControl;
  latitude: number;
  longitude: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  @Output() Dir = new EventEmitter<Object>();
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
          
          this.dir.lat = place.geometry.location.lat();
          this.dir.lng = place.geometry.location.lng();
          this.dir.city = place.vicinity;
          this.dir.address = place.name;
          this.Dir.emit(this.dir);
          
        });
      });
    });
  }

  
 
}
