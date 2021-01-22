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
            <li class="dropdown ml-auto nav-item mr-2">
              <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
                <i class="fa fa-shopping-cart nav-link" aria-hidden="true"></i>
                <span class="badge badge-pill badge-danger"  v-if="cart.carts.length">{{cart.carts.length}}</span>
                <span class="sr-only">unread messages</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px"
                data-offset="400">
                <h6>已選擇商品</h6>
                <table class="table table-sm"  v-if="cart.carts.length">
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class="align-middle text-center">
                        <a href="#" class="text-muted mr-1" @click.prevent="removeCart(item.id)">
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </a>
                      </td>
                      <td class="align-middle">{{ item.product.title }}</td>
                      <td class="align-middle">{{ item.qty }}{{item.product.unit}}</td>
                      <td class="align-middle text-right">{{item.total}}</td>
                    </tr>
                  </tbody>
                </table>
                <router-link to="/cart" class="btn btn-primary btn-block">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
                </router-link>
              </div>
            </li>
            <li class="nav-item mr-2">
              <router-link class="nav-link" to="/login">
                <i class="fas fa-user-cog"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav class="nav-height">
    </nav>
  </div>
</template>


<script>
export default {
  name: 'Navbar',
  data(){
    return {
      cart:{
        carts:[],
      },
    }
  },
  methods:{
    getCart() {
      const vm = this;
      vm.$store.state.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        if (response.data.data.carts) {
          vm.cart = response.data.data;
        }
        vm.$store.state.isLoading = false;
        console.log('取得購物車', response.data.data);
      });
    },
    removeCart(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$store.state.isLoading = true;
      this.$http.delete(api).then((response) => {
        vm.$store.state.isLoading = false;
        vm.getCart();
        console.log('刪除購物車項目', response);
      });
    },
  },
  created() {
    this.getCart();
  },
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
  .btn-cart {
    background-color: transparent;
    position: relative;
    top:-1px;
  }
  .btn-cart .badge {
    position: absolute;
    top: -2px;
    right: -2px;
  }
  .nav-height{
    height:80px;
  }
</style>