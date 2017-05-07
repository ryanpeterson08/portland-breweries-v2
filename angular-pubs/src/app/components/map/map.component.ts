import { Component, OnInit } from '@angular/core';
import { BreweryService } from '../../services/brewery.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [BreweryService]
})
export class MapComponent implements OnInit {
  pubArray: any = [];

  constructor(private breweryService: BreweryService) { }


  ngOnInit() {
    this.breweryService.makeMap();
    this.breweryService.getBreweries();

    this.breweryService.createPubArray().subscribe(result => {
      for(var i = 0; i < result.length; i++){
        this.pubArray.push(result[i]);
      }
    });

  }

  updateStatus(pub){
    var _pub = {
      _id: pub._id,
      type: pub.type,
      properties: {
        Brewery: pub.properties.Brewery,
        Address: pub.properties.Address,
        Website: pub.properties.Website,
        Amenities: pub.properties.Amenities,
        Visited: !pub.properties.Visited
      },
      geometry: {
        type: pub.geometry.type,
        coordinates: pub.geometry.coordinates
      }
    };
    console.log(_pub.properties.Visited);
    this.breweryService.updateVisit(_pub).subscribe(data => {
      pub.properties.Visited = !pub.properties.Visited;
    });
  }

}
