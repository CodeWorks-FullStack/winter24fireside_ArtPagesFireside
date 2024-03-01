<template>
 <div @click="getActiveArtwork" class="artwork selectable text-light" data-bs-toggle="modal" data-bs-target="#active-artwork-modal" :title="artwork.altDescription">
  <img :src="artwork.smallUrl" :alt="artwork.altDescription">
 </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Artwork } from '../models/Artwork.js';
import Pop from '../utils/Pop.js';
import { artworksService } from '../services/ArtworksService.js';

export default {
  props: {artwork: {type: Artwork, required: true}},
  setup(props){
  return {
    async getActiveArtwork(){
      try {
        await artworksService.getActiveArtwork(props.artwork.id)
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.artwork{


  img{
    width: 100%;
  }
}
</style>
