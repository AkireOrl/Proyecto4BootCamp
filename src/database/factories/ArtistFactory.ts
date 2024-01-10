import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Artist } from "../../models/Artist";

// -----------------------------------------------------------------------------

export class ArtistFactory extends BaseFactory<Artist> {
    protected generateSpecifics(artist: Artist): Artist {
        artist.name = faker.person.firstName();
        artist.surname = faker.person.lastName();
        artist.portfolio = faker.image.urlLoremFlickr(), faker.image.urlLoremFlickr(), faker.image.urlLoremFlickr(); // 'https://loremflickr.com/640/480?lock=1234']

    
    

      return artist;
   }
}