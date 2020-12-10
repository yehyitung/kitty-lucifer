<template>
  <div class="home">
   <a href="#" @click.prevent="signout">Log out</a>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  },
  methods:{
    signout(){
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if(response.data.success){
          vm.$router.push('/login');
        }
      })
    }
  }
}
</script>
