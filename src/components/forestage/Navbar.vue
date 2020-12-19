<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light border-bottom shadow-sm fixed-top bg-light">
      <div class="container-xl">
        <router-link class="navbar-brand mr-5" to="/">
          <img src="@/assets/image/KittyLucifer-logo.png" class="img-fluid navbar-logo" alt="">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample07XL">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active mr-2">
              <router-link to="/" class="nav-link">
                Home
              </router-link>
            </li>
            <li class="nav-item mr-2">
              <router-link to="/about" class="nav-link">
                About
              </router-link>
            </li>
            <li class="nav-item mr-2">
              <router-link to="/all-products" class="nav-link">
                Products
              </router-link>
            </li>
            <li class="nav-item mr-2">
              <router-link to="/contact" class="nav-link">
                Contact
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav my-2 my-md-0">
            <li class="nav-item mr-2">
              <a class="nav-link" href="#">
                <i class="fas fa-heart"></i>
              </a>
            </li>
            <li class="nav-item mr-2">
              <a class="nav-link" href="#">
                <i class="fas fa-shopping-cart"></i>
              </a>
            </li>
            <li class="nav-item mr-2">
              <a class="nav-link" href="#">
                <i class="fas fa-user-cog"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav class="mb-5" height="80">
    </nav>
  </div>
</template>


<script>
export default {
  name: 'Navbar',
  methods:{

  }
}
</script>


<style lang="scss" scoped>
  .navbar-brand{
    background-color: rgba(0, 0, 0, 0);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0);
    .navbar-logo{
      width: 200px;
    }
  }
  .navbar-nav{
    .nav-item{
      .nav-link:hover{
        color: #485d6d;
      }
    }
  }
</style>