<template>
  <div class="field">
    <div class="field-box">
      <!-- <img class="field-box-bg" src="../assets/weel.png" /> -->
      <div class="field-box-bg">
        <img class="field-box-img" src="../assets/bg.png" />
      </div>

      <div class="field-box-tab" @click="goback">
        <div class="field-tab-text">阳光舞蹈队排练</div>
        <img class="field-tab-img" src="../assets/back.png" />
      </div>

      <div class="field-box-btn">
        <div class="field-box-btn-con">我要报名</div>
      </div>

      <div class="home-box-con">
        <div class="siguup-text">活动信息</div>
        <div class="siguup-box">
          <div class="siguup-box-list">
            <div class="siguup-box-list-text">活动目标：舞蹈爱好者</div>
            <div class="siguup-box-list-btn">已报名</div>
          </div>
          <div class="siguup-box-list">
            <div class="siguup-box-list-text">活动人数：20人</div>
          </div>
          <div class="siguup-box-list">
            <div class="siguup-box-list-text">活动时间：7月15日（周四）</div>
          </div>
        </div>
        <div class="siguup-text siguup-top">活动信息</div>

        <div class="siguup-con">
          <div class="siguup-con-text">
            为了参加8月中旬举办的“梅泾草根文艺晚会”，我们特别排练《最美梅泾》舞蹈节目，暂定于7月15日举行练习会，请大家准时参加。
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
  name: "siguUp",
  setup() {
    onMounted(() => {});

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
    const tolist = () => {
      router.push("/field");
    };

    const goback = () => {
      console.log("fabhui");
      router.go(-1);
    };

    return { ...from, tolist, goback };
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

    .siguup-text {
      width: 345px;
      margin-top: 50px;
      display: flex;
      flex-direction: row;
      font-size: 18px;
      line-height: 18px;
      color: #486bef;
      font-weight: bold;
    }
    .siguup-con {
      background: #ffffff;
      margin-top: 12px;
      width: 345px;
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      .siguup-con-text {
        padding: 15px 32px 20px 12px;
        font-size: 16px;
        color: #333333;
        max-width: 600px;
        text-align: left;
      }
    }
    .siguup-box {
      background: #ffffff;
      margin-top: 12px;
      width: 345px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .siguup-box-list {
        margin: 15px 0 15px 0;
        width: 100%;
        // margin: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .siguup-box-list-text {
          margin-left: 14px;
          font-size: 16px;
          line-height: 16px;
          color: #333333;
        }
        .siguup-box-list-btn {
          margin-right: 14px;
          padding: 6px;
          background: #66c5f2;
          border-radius: 2px;
          color: #ffffff;
          font-size: 13px;
          line-height: 13px;
        }
      }
    }
    .siguup-top {
      margin-top: 15px;
    }
  }
}
</style>
