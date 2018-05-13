import 'hammerjs';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatFormFieldModule,
  MatGridListModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSliderModule,
  MatDividerModule,

} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule

  ],
  exports: [
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule

  ],
  declarations: []
})
export class AppMaterialModule {}
