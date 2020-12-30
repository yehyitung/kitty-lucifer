<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container main-contant mb-5 mt-5">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div
            class="list-group text-center h5 custom-list-group"
            id="myList"
            role="tablist"
          >
            <li class="list-group-item bg-accent text-light">商品類別</li>
            <a
              class="list-group-item list-group-item-action"
              href="#"
              @click.prevent="getText('')"
              :class="{ active: searchText === '' }"
              >所有商品</a
            >
            <a
              class="list-group-item list-group-item-action"
              href="#"
              v-for="item in categories"
              :key="item"
              :class="{ active: item === searchText }"
              @click.prevent="getText(item)"
              >{{ item }}</a
            >
          </div>

            <!-- <div class="list-group">
              <a class="list-group-item list-group-item-action active" data-toggle="list" href="#list-gold">
                <i class="fa fa-suitcase" aria-hidden="true"></i> 全部商品</a>
              <a class="list-group-item list-group-item-action" data-toggle="list" href="#list-gift">
                <i class="fa fa-gift" aria-hidden="true"></i> 用品區</a>
              <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-film" aria-hidden="true"></i> 衣物區</a>
              <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-paw" aria-hidden="true"></i> 包包區</a>
              <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-tree" aria-hidden="true"></i> 其他類別</a>
            </div> -->
        </div>
        <div class="col-md-9">
          <!-- 主要商品列表 (Card) -->
          <div class="tab-content">
            <div class="tab-pane active" id="list-gold">
              <div class="row">
                <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                  <router-link class="card border-0 shadow-sm text-decoration" :to="`/all-products/${item.id}`">
                    <div style="height: 150px; background-size: cover; background-position:center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
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
                    </div>
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
                  </router-link>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="list-gift">
              <div class="row align-items-stretch">
                <!-- 禮品 -->
                <div class="col-md-4 mb-4">
                  <div class="card border-0 box-shadow text-center h-100">
                    <img class="card-img-top" src="https://images.unsplash.com/photo-1482173074468-5b323335debe?w=1350" alt="Card image cap">
                    <div class="card-body">
                      <h4 class="card-title">超精緻禮物</h4>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                      </a>
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
      product:[],
      status:{
        loadingItem: ''
      },
      cart:{},
      isLoading: false,
    };
  },
  components: {

  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data, 'success');
        vm.products = response.data.products;
        // vm.pagination = response.data.pagination;
        vm.isLoading = false;
      })
    },
    addtoCart(id, qty = 1){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id:id,
        qty
      }
      this.$http.post(api, { data: cart }).then((response) => {
        
        console.log(response);
        // vm.pagination = response.data.pagination;
         vm.status.loadingItem = '';
         vm.getCart();
         $('#productModal').modal('hide');
      })
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