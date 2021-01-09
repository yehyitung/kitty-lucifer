<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
          建立優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
            <th>名稱</th>
            <th width="200">折扣百分比</th>
            <th width="200">到期日</th>
            <th width="150">是否啟用</th>
            <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent}}%</td>
          <td>{{item.due_date}}</td>
          <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
          </td>
          <td>
              <div class="btn-group">
                  <button class="btn btn-outline-info btn-sm" @click="openModal(false, false, item)">編輯</button>
                  <button class="btn btn-outline-danger btn-sm" @click="openModal(false, true, item)">刪除</button>
              </div>

          </td>
        </tr>
      </tbody>
    </table>
    <!--Pagination-->
    <Pagination :pages="pagination" @emit-page="getCoupon"></Pagination>
    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                  <span v-if="isNew">新增優惠券</span>
                  <span v-else>編輯優惠券</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempCoupon.title">
              </div>
              <div class="form-group">
                  <label for="code">優惠碼</label>
                  <input type="text" class="form-control" id="code" placeholder="請輸入優惠碼" v-model="tempCoupon.code">
              </div>
              <div class="form-group">
                  <label for="due_date">到期日</label>
                  <input type="text" class="form-control" id="due_date" placeholder="請輸入到期日" v-model="tempCoupon.due_date">
              </div>
              <div class="form-group">
                  <label for="percent">折扣百分比</label>
                  <input type="number" class="form-control" id="percent" placeholder="請輸入折扣百分比" v-model="tempCoupon.percent">
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateCoupon()">更新優惠券</button>
            </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                  <span>刪除優惠券</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-danger" @click="removeCoupon">確認刪除</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination';

export default {
    data() {
        return {
            coupons: [],
            tempCoupon: {},
            isNew: true,
            pagination: {},
            delCoupon: false
        }
    },
    methods: {
        getCoupon(page = 1) {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
          const vm = this;
          vm.$store.state.isLoading = true;
          this.$http.get(api).then((response) => {
              vm.$store.state.isLoading = false;
              console.log(response.data);
              vm.coupons = response.data.coupons;
              vm.pagination = response.data.pagination;
              vm.coupons.forEach((item) => {
                  const dates = new Date(item.due_date * 1000);
                  const year = dates.getFullYear();
                  const month = dates.getMonth() + 1;
                  const date = dates.getDate();
                  item.due_date = `${year}/${month}/${date}`
              }) //讓Unix Timestamp轉回一般日期格式顯示
              // console.log(vm.coupons);
          })
        },
        openModal(isNew, delCoupon, item) {
          if (isNew) {
              this.tempCoupon = {};
              this.isNew = true;
              $('#couponModal').modal('show');
          } else if (!isNew && !delCoupon) {
              this.tempCoupon = Object.assign({}, item);
              this.isNew = false;
              $('#couponModal').modal('show');
          } else {
              this.tempCoupon = item;
              this.delCoupon = true;
              $('#delCouponModal').modal('show');
          }
        },
        updateCoupon() {
          let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
          let httpMethod = 'post';
          const vm = this;
          vm.$store.state.isLoading = true;
          vm.tempCoupon.due_date = Math.floor(new Date(vm.tempCoupon.due_date) / 1000);
          if (!vm.isNew) {
              api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
              httpMethod = 'put';
          }
          this.$http[httpMethod](api, {
              data: vm.tempCoupon
          }).then((response) => {
              vm.$store.state.isLoading = false;
              console.log(response.data);
              vm.getCoupon();
              $('#couponModal').modal('hide');
          })
        },
        removeCoupon() {
          const vm = this;
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
          vm.$http.delete(api).then((response) => {
              if (response.data.success) {
                  $('#delCouponModal').modal('hide');
                  vm.getCoupon();
                  console.log(response.data.message)
              } else {
                  $('#delCouponModal').modal('hide');
                  vm.getCoupon();
                  console.log(response.data.message)
              }
          })
        },
    },
    components: {
      Pagination
    },
    created() {
      this.getCoupon();
    }

}
</script>