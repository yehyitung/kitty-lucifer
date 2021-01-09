<template>
  <div>
    <div class="container main-contant mb-5 mt-5">
      <nav aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumb bg-transparent pl-0">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-primary-light">首頁</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/all-products" class="text-primary-light">
              全部產品
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ productContent.title }}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-8">
          <div class="w-200" :style="[
              { backgroundImage: `url(${productContent.imageUrl})` },
              { height: '600px' },
              { backgroundPosition: 'center' },
              { backgroundSize: 'cover' },
            ]">
          </div>
          <div class="alert alert-secondary mt-4" role="alert">
            <h2 class="text-center">購物說明</h2>
            {{ productContent.content }}
          </div>
        </div>
        <div class="col-md-4 mb-5">
          <div class="sticky-top" style="top: 10px;">
            <h1 class="h2">
              {{ productContent.title }}
            </h1>
            <p>
              {{ productContent.description }}
            </p>
            <div class="d-flex my-3 align-items-end justify-content-end">
              <del class="text-muted">原價 {{ productContent.origin_price | currency }}</del>
              <div class="h3 mb-0 ml-auto text-danger">
                <span class="text-danger">特價</span>
                <span class="text-danger">
                  {{ productContent.price | currency }}
                </span>
              </div>
            </div>
            <div class="input-group mt-3">
              <select class="form-control mr-1" id="" v-model="productContent.num">
                <option :value="num" v-for="num in 10" :key="num">
                  {{ num }} {{ productContent.unit }}
                </option>
              </select>
              <a href="shoppingCart-checkout.html" class="btn btn-primary">
                <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
              </a>
            </div>
            <div class="mt-2 text-right text-muted">
              <i class="fa fa-cc-visa" aria-hidden="true"></i>
              <i class="fa fa-cc-jcb" aria-hidden="true"></i>
              <i class="fa fa-cc-paypal" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>是否確認刪除商品</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
            <button type="button" class="btn btn-outline-danger px-5">是</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return{
      id:'',
      productContent:{
        num:1,
      },
    };
  },
  methods: {
    getProductContent(){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.id}`;
      vm.$store.state.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data, 'success');
        vm.productContent = response.data.product;
        vm.productContent.num = 1;
        vm.$store.state.isLoading = false;
      })
      
    }
  },
  created() {
    this.id = this.$route.params.productId;;
    this.getProductContent();
  },
}
</script>