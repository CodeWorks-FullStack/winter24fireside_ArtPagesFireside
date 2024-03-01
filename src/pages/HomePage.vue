<template>
<div class="grid">
  <!-- STUB previous Button -->
  <!-- <button :title="`move to page ${currentPage -1}`" @click="changePage(currentPage -1)" :disabled="currentPage == 1" class="btn text-dark"><i class="mdi mdi-arrow-left"></i></button> -->
  <RouterLink :to="{query: {page: currentPage - 1}}" :class="{disabled: currentPage == 1}">
    <button class="btn text-dark" :disabled="currentPage == 1">
      <i class="mdi mdi-arrow-left"></i>
    </button>
  </RouterLink>
  <section class="columns my-2">

    <div class="art" v-for="art in artworks" :key="art.id">
      <ArtworkCard  :artwork="art"/>
    </div>

  </section>
  <!-- STUB next Button -->
  <!-- <button :title="`move to page ${currentPage +1}`" @click="changePage(currentPage +1)" :disabled="currentPage == totalPages" class="btn text-dark"><i class="mdi mdi-arrow-right"></i></button> -->
  <RouterLink :to="{query: {page: currentPage + 1}}" :class="{disabled: currentPage == totalPages}">
    <button class="btn text-dark" :disabled="currentPage == totalPages">
      <i class="mdi mdi-arrow-right"></i>
    </button>
  </RouterLink>
</div>
<section class="page-counter">
  <kbd class=" text-light rounded-pill px-3">
    {{ currentPage }} / {{ totalPages }}
  </kbd>
</section>
<ActiveArtModal/>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import ArtworkCard from '../components/ArtworkCard.vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { artworksService } from '../services/ArtworksService.js';
import ActiveArtModal from '../components/ActiveArtModal.vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';

export default {
    setup() {
      onMounted(()=>{
        // getArtworks()
      })
      async function getArtworks(){
        try {
          await artworksService.getArtworks()
        } catch (error) {
          Pop.error(error)
        }
      }
      const route = useRoute()// is where you are
      const router = useRouter()// is what takes you from place to place
      // Watch attaches the listener
      watch(route, ()=>{
        const pageNumber = route.query.page
        logger.log('route changed!', pageNumber)
        if(!pageNumber){
          getArtworks()
        } else {
          changePage(pageNumber)
        }
      },
      {immediate: true})

      async function changePage(pageNumber){
        try {
          await artworksService.changePage(pageNumber)
        } catch (error) {
          Pop.error(error)
        }
      }
        return {
          artworks: computed(()=> AppState.artworks),
          currentPage: computed(()=> AppState.currentPage),
          totalPages: computed(()=> AppState.totalPages),
          changePage
        };
    },
    components: { ArtworkCard, ActiveArtModal, RouterLink }
}
</script>

<style scoped lang="scss">

.disabled{
  cursor: not-allowed;
  pointer-events: none;
}

.grid{
  display: grid;
  grid-template-columns: 50px 1fr 50px;

  button{
    height: 100dvh;
    position: sticky;
    top: 0;
    font-size: 20px;
    border:0;
    &:disabled{
      color: rgb(168, 175, 184) !important;
    }
  }
}

$gap : 8px;
.columns{
  columns: 250px;
  column-gap: $gap;
  .art{
    margin-bottom: $gap;
  }
}

.page-counter{
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: .75em;
  kbd{
    background-color: rgba(0, 0, 0, 0.469);
    backdrop-filter: blur(15px);
  }
}
</style>
