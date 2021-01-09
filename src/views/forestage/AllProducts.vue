<template>
  <div>
    <div class="container main-contant mb-5 mt-5">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group text-center h5 custom-list-group">
            <!-- <li class="list-group-item bg-accent text-light">商品類別</li> -->
            <a class="list-group-item list-group-item-action" href="#"
              @click.prevent=" searchText = '' "
              :class="{ 'active': searchText === '' }">
              所有商品
            </a>
            <a class="list-group-item list-group-item-action" href="#"
              v-for="item in categories"
              :key="item"
              :class="{ 'active': item === searchText }"
              @click.prevent="searchText = item">
              {{ item }}
            </a>
          </div>
        </div>
        <div class="col-md-9">
          <!-- 主要商品列表 (Card) -->
          <div class="tab-content">
            <div class="tab-pane active" id="all-product" role="tabpanel">
              <div class="row">
                <div class="col-md-4 mb-4" v-for="item in filterData" :key="item.id">
                  <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position:center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                    </div>
                    <router-link class="card-body text-decoration" :to="`/all-products/${item.id}`">
                      <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <p class="card-text">{{ item.description }}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price}} 元</div>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price}} 元</del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                      </div>
                    </router-link>
                    <div class="card-footer d-flex">
                      <button type="button" class="btn btn-outline-secondary btn-sm"  @click="openSingleProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                      </button>
                      <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';


export default {
  data(){
    return{
      products:[],
      searchText: '',
      categories: [],
      status:{
        loadingItem: ''
      },
    };
  },
  components: {
    
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter(item => {
          const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
          console.log(data);
        });
      }
      return this.products;
    },
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$store.state.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data, 'success');
        vm.products = response.data.products;
        vm.getUnique();
        vm.$store.state.isLoading = false;
      })
    },
    addtoCart(id, qty = 1){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const item = {
        product_id:id,
        qty
      };
      vm.$store.state.isLoading = true;
      this.$http.post(api, { data: item }).then((response) => {
        vm.$store.state.isLoading = false;
        console.log(response);
        vm.status.loadingItem = '';
        // vm.getCart();
        // $('#productModal').modal('hide');
      })
    },
    getUnique() {
      const vm = this;
      const categories = new Set();
      vm.products.forEach((item) => {
        categories.add(item.category);
      });
      vm.categories = Array.from(categories);
      console.log(categories);
    },
    openSingleProduct(id) {
      console.log('enter');
      this.$router.push(`/all-products/${id}`);
    },
    
  },
  created() {
    this.getProducts();
  },
}
</script>

<style lang="scss">
  .text-decoration{
    text-decoration: none !important;
  }

</style>