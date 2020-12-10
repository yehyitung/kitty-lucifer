<template>
  <div>
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Sidebar,
  }
}
</script>


<style lang="scss">
</style>