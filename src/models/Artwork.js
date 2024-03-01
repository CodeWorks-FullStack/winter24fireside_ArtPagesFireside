



export class Artwork{
  constructor(data){
    this.id = data.id
    this.slug = data.slug
    this.description = data.description
    this.altDescription = data.altDescription
    this.attribution = data.attribution
    this.smallUrl = data.imgUrls.small
    this.largeUrl = data.imgUrls.full
    this.rawUrl = data.imgUrls.raw
    this.height = data.height
    this.width = data.width
  }
}
