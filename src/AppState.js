import { reactive } from 'vue'
import { Artwork } from './models/Artwork.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {Artwork[]} */
  artworks: [],
  /** @type {Artwork} */
  activeArtwork: null,
  currentPage: 1,
  totalPages: 1
})
