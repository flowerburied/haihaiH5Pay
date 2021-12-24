<template>
  <div class="about">
    <van-button type="primary">{{ layout.labelCol.span }}</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger" @click="toabout">危险按钮</van-button>
    <div id="qrcode"></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { qrcanvas } from "qrcanvas";
export default {
  name: "About",
  mounted() {
    console.log("test", this.$store.state.test);
  },
  setup() {
    let store = useStore();

    onMounted(() => {
      // console.log("fromConfig", store.state.test);
      store.dispatch("testFun", "payload");

      nextTick(() => {
        var canvas = qrcanvas({
          data: "6666",
          size: 66,
        });
        document.getElementById("qrcode").innerHTML = "";
        document.getElementById("qrcode").appendChild(canvas);
      });
    });

    const fromConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    });

    const from = toRefs(fromConfig);

    const router = useRouter();
    const toabout = () => {
      router.push("/about");
    };

    return { ...from, toabout };
  },
};
</script>

<style lang="scss">
.about {
  width: 100%;
  height: 100vh;
}
</style>
