<template>
  <div>
    <table class="table mt-5">
        <thead>
            <tr>
                <th width="120">購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th width="120">應付金額</th>
                <th width="100">是否付款</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in orders" :key="item.id">
                <td>{{item.paid_date}}</td>
                <td>{{item.user.email}}</td>
                <td>
                    <ul class="list-unstyled">
                        <li v-for="(product, i) in item.products" :key="i">
                            {{product.product.title}} : {{product.qty}} {{product.product.unit}}
                        </li>
                    </ul>
                </td>
                <td class="text-right">{{item.total | currency}}</td>
                <td>
                    <div class="text-success" v-if="item.is_paid">已付款</div>
                    <div class="text-muted" v-else>尚未啟用</div>
                </td>
            </tr>
        </tbody>
    </table>
    <!--Pagination-->
    <Pagination :pages="pagination" @emit-page="getOrders"></Pagination>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination';

export default {
  data() {
    return {
        orders: [], //存取訂單資料
        pagination: {}
    }
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this;
      vm.$store.state.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.$store.state.isLoading = false;
        console.log(response.data);
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        console.log(vm.pagination);
        vm.orders.forEach((item) => {
          if (item.paid_date) {
              const dates = new Date(item.paid_date * 1000);
              const year = dates.getFullYear();
              const month = dates.getMonth() + 1;
              const date = dates.getDate();
              item.paid_date = `${year}/${month}/${date}`
          } else {
              item.paid_date = '無付款資訊';
          }
        })
      })
    }
  },
  components: {
      Pagination
  },
  created() {
      this.getOrders();
  }
}
</script>