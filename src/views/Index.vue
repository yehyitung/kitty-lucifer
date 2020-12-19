<template>
  <div>
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
          <main class="col-lg-10 p-0">
              <router-view/>
          </main>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/forestage/Footer.vue';
import Navbar from '@/components/forestage/Navbar.vue';


export default {
  components: {
    Footer,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
</style>
