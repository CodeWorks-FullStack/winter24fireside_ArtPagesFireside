<template><!-- Modal -->
<div
  class="modal fade"
  id="active-artwork-modal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="modalTitleId"
  aria-hidden="true"
>
  <div
    class="modal-dialog modal-fullscreen"
    role="document"
  >
    <div class="modal-content" v-if="activeArt">
      <div class="modal-body">
        <div class="d-flex">
          <div class="text-center art-img">
            <img :src="activeArt.largeUrl" :alt="activeArt.altDescription" :height="activeArt.height" :width="activeArt.width" >
          </div>
            <div class="p-3 pt-5 art-desc">
              <div class="text-end close-button"> <button class="btn" data-bs-dismiss="modal"><i class="mdi mdi-close"></i></button></div>
              <p>{{ activeArt.description }}</p>
              <div>
                <i>{{ activeArt.attribution }}</i>
              </div>
              <div>
                <a class="text-info" :href="activeArt.rawUrl" target="_blank" title="full sized image link"><i class="mdi mdi-link"></i><i class="mdi mdi-image"></i></a>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
export default {
  setup(){
  return {
    activeArt: computed(()=> AppState.activeArtwork),
    background: computed(()=> `url(${AppState.activeArtwork?.smallUrl})`)
   }
  }
};
</script>


<style lang="scss" scoped>
:root{
  --bs-modal-padding: 7px;
}
.modal-content{
  background-color: rgba(226, 226, 226, 0.75) !important;
  backdrop-filter: blur(18px);
}
.art-img{
  max-height: calc(100vh - var(--bs-modal-padding) - var(--bs-modal-padding));
  max-width: 70%;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-image: v-bind(background);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.art-desc{
  display: inline-block;
  overflow-wrap: break-word;

}

.close-button{
  position: fixed;
  top: 25px;
  right: 25px;
}
</style>
