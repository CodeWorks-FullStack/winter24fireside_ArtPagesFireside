import axios from "axios"
import { Artwork } from "../models/Artwork.js"
import { AppState } from "../AppState.js"


const artworkApi = axios.create({
  baseURL : 'https://unsandbox.herokuapp.com/',
  timeout: 12000
})


class ArtworksService {
  async getArtworks(){
    const response = await artworkApi.get('api/artworks')
    let artworks = response.data.artworks.map(a => new Artwork(a))
    AppState.artworks = artworks
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.pages
  }

  async getActiveArtwork(artId){
    AppState.activeArtwork = null
    const response = await artworkApi.get(`api/artworks/${artId}`)
    AppState.activeArtwork = new Artwork(response.data)
  }

  async changePage(pageNumber){
    const response = await artworkApi.get(`api/artworks?page=${pageNumber}`)
    let artworks = response.data.artworks.map(a => new Artwork(a))
    AppState.artworks = artworks
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.pages
  }
}

export const artworksService = new ArtworksService()
