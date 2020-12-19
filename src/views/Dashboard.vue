<template>
  <div>
    <Navbar/>
    <Alert></Alert>
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
import Navbar from '@/components/backstage/Navbar.vue'
import Sidebar from '@/components/backstage/Sidebar.vue'
import Alert from '@/components/backstage/AlertMessage.vue'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Sidebar,
    Alert,
  },
  created() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${myCookie}`;
  }
}
</script>


<style lang="scss">
</style>