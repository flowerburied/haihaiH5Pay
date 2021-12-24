<template>
  <div class="home">
    <div class="home-box">
      <div class="home-box-bg" v-if="isregister">
        <img class="field-box-img" src="../assets/bg.png" />
        <van-form @failed="onfailed" @submit="onSubmit">
          <div class="box-bg-title">请输入身份证完成注册</div>

          <van-cell-group inset>
            <van-field
              v-model="username"
              name="id_card"
              label="身份证"
              placeholder="身份证"
              :rules="[{ pattern, message: '请填写身份证' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>

      <div class="home-box-con">
        <img class="home-box-con-img" src="../assets/weel.png" />

        <div class="home-box-con-box">
          <div
            @click="toabout(index)"
            class="con-box"
            v-for="(it, index) in boxlist"
            :style="{ background: it.color }"
            :key="index"
          >
            <div class="con-box-text">{{ it.name }}</div>
            <img class="con-box-img" :src="it.url" />
          </div>
        </div>
        <video ref="viId"></video>
      </div>
    </div>
  </div>
</template>

<script>
// nextTick
import { reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import api from "../api/api.js";
import { Notify } from "vant";
import { Dialog } from "vant";
// import { qrcanvas } from "qrcanvas";
export default {
  name: "Home",
  mounted() {
    const getid = this.$refs.viId;
    console.log("getid", getid);
  },

  setup() {
    let store = useStore();
    onMounted(() => {

      store.dispatch("testFun", "payload");

      // getCodeApi();
    });
    // const username = "";
    const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // const isregister = ref("");
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
      isregister: true,
      id_card: /\d{6}/,
      username: "",
    });

    const from = toRefs(fromConfig);

    const router = useRouter();
    const toabout = (index) => {
      if (index == 0) {
        router.push("/fieldList");
      } else if (index == 5) {
        router.push("/qrcode");
      }
    };

    const getCodeApi = () => {
      //获取code
      let iftrue = localStorage.getItem("iftrue");
      if (!iftrue) {
        let urlNow = encodeURIComponent(window.location.href);
        let scope = "snsapi_userinfo"; //snsapi_userinfo   //静默授权 用户无感知
        let appid = "wxcdbcf002a88b179c";
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
        window.location.replace(url);
        localStorage.setItem("iftrue", true);
      } else {
        getUrlKey();
      }
    };

    const getUrlVars = () => {
      var vars = [],
        hash;
      var hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    };

    const getUrlKey = () => {
      let list = getUrlVars();
      let code = list.code;
      // this.myCode = code;
      localStorage.setItem("code", code);

      localStorage.removeItem("iftrue");

      tosign();
    };
    const tosign = async () => {
      try {
        // console.log(this.myCode);
        let code1 = localStorage.getItem("code");
        let option = {
          jscode: code1,
        };
        console.log("option", option);
        const res = await api.field.GetOpenid(option);
        console.log("res", res);
        localStorage.setItem("openid", res.data.data);

        const { code } = res.data;
        if (code == 200) {
          console.log("通过");
          fromConfig.isregister = false;
        } else if (code == 500) {
          console.log("错误 ");
          fromConfig.isregister = true;
        } else if (code == 404) {
          console.log("没有绑定身份证信息");
          fromConfig.isregister = true;
        }
      } catch (e) {
        console.log(e);
      }
    };

    const onSubmit = (values) => {
      console.log("submit", values);
      toLogin(values.id_card);
    };
    const onfailed = (errorInfo) => {
      console.log("failed", errorInfo);
    };

    const toLogin = async (id_card) => {
      try {
        // console.log(this.myCode);
        let code1 = localStorage.getItem("openid");
        let option = {
          openid: code1,
          id_card: id_card,
        };
        console.log("option", option);
        const res = await api.field.Login(option);
        console.log("res", res);
        // localStorage.setItem("openid", res.data.openid);

        const { code } = res.data;
        if (code == 200) {
          console.log("通过");
          fromConfig.isregister = false;
          Notify({ type: "success", message: "提交成功" });
        } else {
          Dialog({ message: "请联系社区,录入居民信息" });
          // Notify({ type: "danger", message: "请联系社区,录入居民信息" });
        }
      } catch (e) {
        console.log(e);
      }
    };

    return { ...from, toabout, onSubmit, onfailed, pattern };
  },
};
</script>

<style lang="scss">
.v {
  width: 320px;
  height: 240px;
}

#qr-canvas {
  width: 800px;
  height: 800px;
}
.home {
  width: 100%;
  // height: 100vh;
  .home-box {
    position: relative;
  }
  .home-box-bg {
    // background-image: url("../assets/weel.png");
    z-index: 5;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;

    .field-box-img {
      position: absolute;
      width: 100%;
      height: 100vh;
    }
    .box-bg-input {
      width: 345px;
      height: 200px;
      background: #ffffff;
      border-radius: 4px;
    }
    .box-bg-title {
      padding: 20px;
    }
  }

  .home-box-con::-webkit-scrollbar {
    display: none; //隐藏滚动条
  }
  .home-box-con {
    z-index: 4;
    position: absolute;
    width: 100%;
    height: 100vh;
    // background: #badc58;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .home-box-con-img {
      width: 100%;
      height: 190px;
    }
    .home-box-con-box {
      width: 354px;
      // height: 206px;
      // background: #dff9fb;
      display: flex;
      flex-wrap: wrap;
      margin: 0 0 0 -11px;
      .con-box {
        margin: 15px 0 0 11px;
        width: 107px;
        height: 135px;
        // background: #f9c26f;
        display: flex;
        align-items: center;
        flex-direction: column;
        .con-box-text {
          margin-top: 16px;
          font-size: 18px;
          line-height: 18px;
          color: #ffffff;
        }
        .con-box-img {
          margin-top: 24px;
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
</style>
