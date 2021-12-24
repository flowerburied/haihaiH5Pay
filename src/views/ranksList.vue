<template>
  <div class="field">
    <div class="field-box">
      <!-- <img class="field-box-bg" src="../assets/weel.png" /> -->
      <div class="field-box-bg">
        <img class="field-box-img" src="../assets/bg.png" />
      </div>

      <div class="field-box-tab" @click="goback">
        <div class="field-tab-text">队伍详情</div>
        <img class="field-tab-img" src="../assets/back.png" />
      </div>
  <div class="field-box-btn">
        <div class="field-box-btn-con">加入队伍</div>
      </div>
      <div class="home-box-con">
        <img class="field-box-con-img" src="../assets/weel.png" />

        <div class="field-box-con-box">
          <div class="box-title">队伍信息</div>
          <div class="box-name">管理员：李继英</div>
          <div class="box-name box-active">联系方式：18074124577</div>
        </div>

        <div class="field-box-con-box">
          <div class="box-title">成员信息</div>
          <div class="rankslist">
            <div class="rankslist-name" v-for="i of 7" :key="i">周巧娣</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// nextTick
import { reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
// import { qrcanvas } from "qrcanvas";
export default {
  name: "torankslist",
  setup() {
    // let store = useStore();
    onMounted(() => {
      // console.log("fromConfig", store.state.test);
      //   store.dispatch("testFun", "payload");
      // nextTick(() => {
      //   var canvas = qrcanvas({
      //     data: "6666",
      //     size: 66,
      //   });
      //   document.getElementById("qrcode").innerHTML = "";
      //   document.getElementById("qrcode").appendChild(canvas);
      // });
    });

    const fromConfig = reactive({
      boxlist: [
        { name: "场地列表", color: "#F9C26F", url: require("@/assets/01.png") },
        { name: "村委动态", color: "#B9D76D", url: require("@/assets/02.png") },
        { name: "村民福利", color: "#6BCAC6", url: require("@/assets/03.png") },
        { name: "志愿活动", color: "#66C5F2", url: require("@/assets/04.png") },
        { name: "文体队伍", color: "#AA89BD", url: require("@/assets/05.png") },
        { name: "社交活动", color: "#EC8989", url: require("@/assets/06.png") },
      ],
      vedio: "",
      canvas: "",
      context: "",
      stopScan: null,
      errorMes: "",
      result: "",
    });

    const from = toRefs(fromConfig);

    const router = useRouter();
    const toabout = (index) => {
      if (index == 5) {
        router.push("/qrcode");
      }
    };

    const goback = () => {
      console.log("fabhui");
      router.go(-1);
    };

    return { ...from, toabout, goback };
  },
};
</script>

<style lang="scss">
.field {
  width: 100%;
  // height: 100vh;
  .field-box {
    position: relative;
  }

  .field-box-bg {
    z-index: 1001;
    position: fixed;
    width: 100%;
    height: 100vh;
    .field-box-img {
      width: 100%;
      height: 100vh;
    }
  }
  .field-box-btn {
    z-index: 1004;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 86px;

    display: flex;
    flex-direction: row;
    // align-items: center;
    justify-content: center;

    .field-box-btn-con {
      width: 250px;
      height: 50px;
      background: #486bef;
      box-shadow: 0px 0px 26px 4px rgba(72, 107, 239, 0.27);
      border-radius: 50px;
      font-size: 16px;
      line-height: 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .field-box-tab {
    z-index: 1004;
    position: fixed;
    width: 100%;
    height: 45px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    .field-tab-img {
      position: absolute;
      top: 15px;
      left: 15px;
      width: 15px;
      height: 15px;
    }
    .field-tab-text {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 16px;
    }
  }

  .home-box-con::-webkit-scrollbar {
    display: none; //隐藏滚动条
  }
  .home-box-con {
    z-index: 1003;
    position: absolute;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    .field-box-con-img {
      margin-top: 45px;
      width: 345px;
      height: 200px;
    }
    .field-box-con-box {
      margin-top: 10px;
      width: 345px;
      display: flex;
      flex-direction: column;
      border-radius: 2px;
      background: #ffffff;
      .box-title {
        font-size: 18px;
        line-height: 18px;
        margin: 13px 0 0 13px;
        color: #486bef;
        font-weight: bold;
        display: flex;
        flex-direction: row;
      }
      .box-name {
        display: flex;
        flex-direction: row;
        margin: 20px 0 0 13px;
        font-size: 16px;
        line-height: 16px;
        color: #333333;
      }
      .box-active {
        margin-bottom: 19px;
      }

      .rankslist {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .rankslist-name {
          padding: 10px 0;
          width: 115px;
          display: flex;
          align-items: center;
          justify-content: center;
          //   margin: 21px 0 0 80px;
          //   width: 60px;
          font-size: 16px;
          line-height: 16px;
          color: #333333;
        }
      }
    }
  }
}
</style>
