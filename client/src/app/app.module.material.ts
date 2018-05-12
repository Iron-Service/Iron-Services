import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule} from '@angular/material/select';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  imports: [CommonModule, MatGridListModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, MatCardModule],
  exports: [MatFormFieldModule, MatGridListModule, MatCheckboxModule, MatExpansionModule, MatSelectModule, MatAutocompleteModule, MatCardModule],
  declarations: []
})
export class AppMaterialModule {}