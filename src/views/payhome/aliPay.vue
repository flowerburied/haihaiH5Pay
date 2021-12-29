<template>
  <div class="aliPay">
    <p>{{ PText }}</p>
    <div>
   
      <!-- <span ref="payhtml" v-html="payGateWay"></span> -->
      <form
        id="alipaysubmit"
        name="alipaysubmit"
        :action="payGateWay"
        method="POST"
      ></form>


    </div>
  </div>
</template>

<script>
export default {
  name: "aliPay",
  data() {
    return {
      payGateWay: "",
      PText: "当前没有操作",
    };
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {
    console.log(this.$route);
    // window.alert(`6666${this.$route.query.htmlData}`);
    if (this.$route.query.htmlData) {
      let form = this.$route.query.htmlData;
      this.PText = "正在跳转中，请稍后...";
      this.payGateWay = form;

      console.log("this.", this.$refs.payhtml);
      console.log("dddd", document.getElementById("alipaysubmit"));

      this.$nextTick(() => {
        // this.$refs.payhtml.submit();
        document.getElementById("alipaysubmit").submit();
      });
    }
  },
  created() {},
};
</script>

<style>
.aliPay {
  width: 100%;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  color: rgb(227, 69, 29);
  text-align: center;
  font-size: 22px;
}

.center-wrap {
  display: flex;
  align-items: center;
}
</style>
