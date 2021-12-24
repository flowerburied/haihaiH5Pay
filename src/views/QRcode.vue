<template>
  <div class="qrcode">
    <div @click="getqr">扫一扫</div>
    <video class="videoel" ref="vide"></video>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";


export default {
  name: "About",
  methods: {},
  // mounted() {
  //   const videoElem = this.$refs.vide;
  //   console.log("videoElem", videoElem);
  // },
  setup() {
    const fromConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    });

    const from = toRefs(fromConfig);

    const vide = ref(null);

    onMounted(() => {
      console.log("vide", vide.value);
    });

    // const qrScanner = new QrScanner(vide, (result) =>
    //   console.log("decoded qr code:", result)
    // );
    // const getqr = () => {
    //   qrScanner.start();
    //   console.log("开始");
    // };
    return { ...from, vide};
  },
};
</script>

<style lang="scss">
.qrcode {
  .videoel {
    width: 100px;
    height: 100px;
  }
}
</style>
