<template>
  <div class="home">
    <div class="site-blocks-cover">
      <div class="container">
        <div class="row align-items-center justify-content-start">
          <div class="col-md-5 text-center text-md-left pt-5 pt-md-0 banner-title">
            <h1 class="mb-3 mt-5">KittyLucufer Store</h1>
            <div class="intro-text text-center text-md-left">
              <h4 class="mb-5">找到屬於你的禮物</h4>
              <p>
                <router-link to="/all-products" href="#" class="btn btn-m btn-primary">立即購買</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="site-section block-8 pb-5">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-md-7 site-section-heading text-center pt-4 mt-5 mb-3">
            <h2>品牌故事</h2>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-12 col-lg-7 mb-5">
            <a href="#"><img src="../../assets/image/product-category-cup.jpg" alt="Image placeholder" class="img-fluid rounded"></a>
          </div>
          <div class="col-md-12 col-lg-5 text-center py-md-5">
            <h2><a href="#">送禮最佳首選</a></h2>
            <p>還在煩惱要送什麼東西給親朋好友嗎?我們有禮盒讓你選擇喔!</p>
            <p>
              <a href="#" class="btn btn-sm btn-primary" @click.prevent="toCategory('禮盒')">馬上選購一盒</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <ProductCategory></ProductCategory>
    <div class="site-section block-3 site-blocks-2 pb-5">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-md-7 site-section-heading text-center pt-4 mt-5">
            <h2>最新商品</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
             <carousel :margin="20" :loop="true" :nav="false" :autoplay="true" v-if="products && products.length" :responsive="{0:{items:1,nav:false},800:{items:2,nav:false},1000:{items:3,nav:false}}">
              <div class="item" v-for="(item, index) in products" :key="index">
                <router-link :to="`/shopsitem/${item.id}`">
                  <div class="block-4 text-center">
                    <figure class="block-4-image">
                        <img :src="item.imageUrl" alt="Image placeholder" class="img-fluid">
                    </figure>
                    <div class="block-4-text p-4">
                      <h3 class="mb-3"><a href="#">{{item.title}}</a></h3>
                      <div class="text-primary font-weight-bold h4 mb-0 mb-2">NT{{item.price | currency}}</div>
                    </div>
                  </div>
                </router-link>
              </div>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCategory from '../../components/forestage/ProductCategory';
import carousel from 'vue-owl-carousel'

export default {
  name: 'Home',
  components: {
    carousel,
    ProductCategory,
  },
  data(){
    return{
      products:[],
    }
  },
  methods: {
    getAllProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      const vm = this
      vm.$http.get(api).then((response) => {
        vm.products = (response.data.products.slice(-6)).reverse().filter((element, index, array) => element.is_enabled === 1)
      })
    },
    toCategory (Name) {
      this.$router.push({
        name: 'AllProducts',
        params: { categoryName: Name }
      })
    }
  },
  created () {
    this.getAllProducts()
  },
}
</script>

<style lang="scss">
  .site-blocks-cover {
    width: 100%;
    height: 700px;
    background-position: right 10% top 40%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image:url('../../assets/image/home-banner01.jpg');
  }
  .banner-title{
    margin-top: 100px;
  }
</style>

