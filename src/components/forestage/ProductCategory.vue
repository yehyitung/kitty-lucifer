<template>
  <div>
    <div class="site-section site-blocks-2 pt-5 pb-5 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 site-section-heading text-center pt-4 mb-5">
            <h2>商品分類</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay="">
            <a class="block-2-item" href="#" @click.prevent="toCategory('包包')">
              <div class="image">
                <img src="../../assets/image/product-category-bag.jpg" alt="" class="img-fluid">
              </div>
              <div class="text pt-4 text-center">
                <h3>包包</h3>
              </div>
            </a>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay="100">
            <a class="block-2-item" href="#" @click.prevent="toCategory('用品')">
              <div class="image">
                <img src="../../assets/image/product-category-cup.jpg" alt="" class="img-fluid">
              </div>
              <div class="text pt-4 text-center">
                <h3>用品</h3>
              </div>
            </a>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay="200">
            <a class="block-2-item" href="#"  @click.prevent="toCategory('衣物')">
              <div class="image">
                <img src="../../assets/image/product-category-cloth.jpg" alt="" class="img-fluid">
              </div>
              <div class="text pt-4 text-center">
                <h3>衣服</h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toCategory (Name) {
      this.$router.push({
        name: 'AllProducts',
        params: { categoryName: Name }
      })
    }
  }
}
</script>
