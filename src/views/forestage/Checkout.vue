<template>
  <div>
    <div class="site-section pt-5 pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-5 mb-md-0 mx-auto text-dark">
            <h2 class="h3 mb-3 text-black text-center">訂單資訊</h2>
            <validation-observer v-slot="{ invalid }" class="col-md-6">
              <form @submit.prevent="createOrder">
                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                  <div class="form-group" >
                    <!-- 輸入框 -->
                    <label for="email">Email</label>
                    <input id="email" type="email" name="email" v-model="form.user.email" class="form-control" :class="classes">
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <input id="username" type="text" name="name" v-model="form.user.name" placeholder="輸入姓名" class="form-control" :class="classes">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <input type="tel" class="form-control" id="usertel" name="phone" :class="classes" v-model="form.user.tel" placeholder="請輸入電話">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input type="text" class="form-control" name="address" id="useraddress" :class="classes" v-model="form.user.address" placeholder="請輸入地址">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <div class="form-group">
                  <label for="comment">留言</label>
                  <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                  <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                </div>
              </form>
            </validation-observer>
          </div>
          <div class="col-md-6 mx-auto ml-3">
            <div class="row mb-5">
              <div class="col-md-12">
                <h2 class="h3 mb-3 text-black text-center">訂單明細</h2>
                <div class="my-5 colum justify-content-center" v-if="cart.carts">
                  <div class="my-5 row justify-content-center">
                    <table class="table">
                      <thead>
                        <th></th>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                      </thead>
                      <tbody>
                        <tr v-for="item in cart.carts" :key="item.id">
                          <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                              <i class="far fa-trash-alt"></i>
                            </button>
                          </td>
                          <td class="align-middle">
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">
                              已套用優惠券
                            </div>
                          </td>
                          <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                          <td class="align-middle text-right">{{ item.final_total }}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="3" class="text-right">總計</td>
                          <td class="text-right">{{ cart.total }}</td>
                        </tr>
                        <tr v-if="cart.final_total !== cart.total">
                          <td colspan="3" class="text-right text-success">折扣價</td>
                          <td class="text-right text-success">{{ cart.final_total }}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div class="input-group mb-3 input-group-sm">
                      <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                          套用優惠碼
                        </button>
                      </div>
                    </div>
                  </div> 
                </div>  
              </div>
            </div>
          </div>
        </div>
        <!-- </form> -->
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
      product:{},
      status:{
        loadingItem: ''
      },
      form:{
        user:{
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart:{},
      coupon_code: '',
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=:page`;
      const vm = this;
      vm.$store.state.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data, 'success');
        vm.products = response.data.products;
        // vm.pagination = response.data.pagination;
        vm.$store.state.isLoading = false;
      })
    },
    getProduct(id){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        console.log(response);
        // vm.pagination = response.data.pagination;
         vm.status.loadingItem = '';
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
    getCart(){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.$store.state.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
        vm.$store.state.isLoading = false;
      })
    },
    removeCartItem(id){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.$store.state.isLoading = true;
      this.$http.delete(api).then(() => {
        // vm.cart = response.data.data;
        vm.getCart();
        vm.$store.state.isLoading = false;
      })
    },
    addCouponCode(){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$store.state.isLoading = true;
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response);
        vm.getCart();
        vm.$store.state.isLoading = false;
      })
    },
    createOrder(){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      vm.$store.state.isLoading = true;
      this.$http.post(api, { data: order }).then((response) => {
        console.log('訂單已建立' ,response);
        if(response.data.success){
          vm.$router.push(`payment/${response.data.orderId}`)
        }
        // vm.getCart();
        vm.$store.state.isLoading = false;
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
    }
}
</script>
