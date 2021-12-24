<template>
  <div class="field">
    <div class="field-box">
      <!-- <img class="field-box-bg" src="../assets/weel.png" /> -->
      <div class="field-box-bg">
        <img class="field-box-img" src="../assets/bg.png" />
      </div>

      <div class="field-box-tab" @click="goback">
        <div class="field-tab-text">场地详情</div>
        <img class="field-tab-img" src="../assets/back.png" />
      </div>

      <div class="home-box-con">
        <img class="field-box-con-img" :src="fieidlist.Url" />

        <div class="field-box-con-box">
          <div class="box-title">场地相关</div>
          <div class="box-name">管理员：{{ fieidlist.AdminName }}</div>
          <div class="box-name box-active">联系方式：{{ fieidlist.Phone }}</div>
        </div>

        <!-- <div class="field-box-con-box" @click="gosiguuo">
          <div class="box-title">一周活动计划</div>
          <div class="box-new">
            <div class="box-new-title">7月15日（周四） 阳光舞蹈队排练</div>
            <div class="box-new-btn">
              <div class="box-new-btn-text">报名</div>
              <img class="box-new-btn-img" src="../assets/blue-to.png" />
            </div>
          </div>
          <div class="box-new box-new-active">
            <div class="box-new-title">7月15日（周四） 阳光舞蹈队排练</div>
            <div class="box-new-btn">
              <div class="box-new-btn-text">报名</div>
              <img class="box-new-btn-img" src="../assets/blue-to.png" />
            </div>
          </div>
        </div>
        <div class="field-box-con-box" @click="torankslist">
          <div class="box-title">一周活动计划</div>
          <div class="box-new">
            <div class="box-new-title">梅泾阳光舞蹈队</div>
            <div class="box-new-btn">
              <div class="box-new-btn-text">查看</div>
              <img class="box-new-btn-img" src="../assets/blue-to.png" />
            </div>
          </div>
          <div class="box-new box-new-active">
            <div class="box-new-title">梅泾水仙花舞蹈队</div>
            <div class="box-new-btn">
              <div class="box-new-btn-text">查看</div>
              <img class="box-new-btn-img" src="../assets/blue-to.png" />
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "field",
  setup() {
    const router = useRouter();
    const route = useRoute();

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
      fieidlist: {},
    });

    const from = toRefs(fromConfig);

    const toabout = (index) => {
      if (index == 5) {
        router.push("/qrcode");
      }
    };

    const goback = () => {
      console.log("fabhui");
      router.go(-1);
    };

    const gosiguuo = () => {
      router.push("/siguUp");
    };
    const torankslist = () => {
      router.push("/ranksList");
    };

    onMounted(() => {
      fromConfig.fieidlist = JSON.parse(route.query.currentRow);
      console.log("getList", fromConfig.fieidlist);
    });

    return { ...from, toabout, goback, gosiguuo, torankslist };
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

      .box-new {
        margin: 20px 0 0 13px;
        display: flex;
        justify-content: space-between;
        .box-new-title {
          //   margin-left: 13px;
          font-size: 16px;
          line-height: 16px;
          color: #333333;
        }
        .box-new-btn {
          margin-right: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          .box-new-btn-text {
            font-size: 16px;
            line-height: 16px;
            color: #486bef;
          }
          .box-new-btn-img {
            margin-left: 6px;
            width: 12px;
            height: 12px;
          }
        }
      }
      .box-new-active {
        margin-bottom: 19px;
      }
    }
  }
}
</style>
