import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class SearchComponent {

  filter = model.required<string>({
    alias: 'filterCriteria'
  });

}
