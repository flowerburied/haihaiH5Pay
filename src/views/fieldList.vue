<template>
  <div class="field">
    <div class="field-box">
      <!-- <img class="field-box-bg" src="../assets/weel.png" /> -->
      <div class="field-box-bg">
        <img class="field-box-img" src="../assets/bg.png" />
      </div>

      <div class="field-box-tab" @click="goback">
        <div class="field-tab-text">场地列表</div>
        <img class="field-tab-img" src="../assets/back.png" />
      </div>

      <div class="home-box-con">
        <!-- <div class="fie-list-box">

          <div class="fie-list-box-list" @click="tolist">
            <div class="box-list-title">舞蹈室</div>
            <div class="box-list-time">活动时间：2021年7月16日-9月30日</div>
          </div>
          <img class="fie-list-box-img" src="../assets/to-arrow.png" />
        </div> -->

        <!-- <div class="fie-list-box fiex-top" >
          <div class="fie-list-box-list">
            <div class="box-list-title">书法室</div>
            <div class="box-list-time">活动时间：2021年7月16日-9月30日</div>
          </div>
          <img class="fie-list-box-img" src="../assets/to-arrow.png" />
        </div> -->
        <!-- <van-button disabled type="primary">禁用状态</van-button> -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
            <div class="fie-list-box" v-for="(it, index) in fieldList" :key="index">
              <div class="fie-list-box-list" @click="tolist(it)">
                <div class="box-list-title">{{ it.Name }}</div>
                <div class="box-list-time">
                  活动时间：{{ it.CreationTime }}-{{ it.EndTime }}
                </div>
              </div>
              <img class="fie-list-box-img" src="../assets/to-arrow.png" />
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
// nextTick
import { ref, onMounted, getCurrentInstance, reactive, toRefs, nextTick } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
// import { qrcanvas } from "qrcanvas";
import api from "../api/api.js";
export default {
  name: "field",
  setup() {
    onMounted(() => {
      // nextTick(() => {
      //   fromConfig.fieldList = getfun(1);
      //   console.log("fromConfig", fromConfig);
      // });
      getfun();
    });

    const fromConfig = reactive({
      // fieldList: [],
      page: 1,
      nomore: 1,
      count: 0,
    });
    const from = toRefs(fromConfig);
    // proxy相当于vue2的this对象
    const { proxy } = getCurrentInstance();
    console.log("proxy", proxy);
    const router = useRouter();
    const tolist = (val) => {
      // router.push("/field");
       router.push({
          path: "/field",
          query: {
            currentRow: JSON.stringify(val),
          },
        });
    };

    const goback = () => {
      console.log("fabhui");
      router.go(-1);
    };

    const list = ref([]);
    const loading = ref(false); //转圈
    const finished = ref(false); //没有更多
    const refreshing = ref(false); //下拉

    const fieldList = ref([]);

    const onLoad = () => {
      console.log("onLoad");
      setTimeout(() => {
        // if (refreshing.value) {
        //   list.value = [];
        refreshing.value = false;
        // }
        // for (let i = 0; i < 10; i++) {
        //   list.value.push(list.value.length + 1);
        // }
        loading.value = false;
        // if (list.value.length >= 40) {
        finished.value = true;
        // }
      }, 1000);
    };

    const onRefresh = () => {
      console.log("onRefresh");
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };

    const getTrueTime = (time) => {
      let date1 = new Date(time * 1000 - 28800000);
      let y = date1.getFullYear();
      let m = date1.getMonth() + 1;
      let d = date1.getDate();
      let h = date1.getHours();
      let min = date1.getMinutes();
      let s = date1.getSeconds();
      m <= 9 ? (m = "0" + m) : m;
      d <= 9 ? (d = "0" + d) : d;
      h <= 9 ? (h = "0" + h) : h;
      min <= 9 ? (min = "0" + min) : min;
      s <= 9 ? (s = "0" + s) : s;
      return y + "年" + m + "月" + d + "日";
    };
    const getTrueTime1 = (time) => {
      let date1 = new Date(time * 1000 - 28800000);
      // let y = date1.getFullYear();
      let m = date1.getMonth() + 1;
      let d = date1.getDate();
      let h = date1.getHours();
      let min = date1.getMinutes();
      let s = date1.getSeconds();
      m <= 9 ? (m = "0" + m) : m;
      d <= 9 ? (d = "0" + d) : d;
      h <= 9 ? (h = "0" + h) : h;
      min <= 9 ? (min = "0" + min) : min;
      s <= 9 ? (s = "0" + s) : s;
      return m + "月" + d + "日";
    };

    const getfun = async () => {
      try {
        let option = {
          page: 1,
          size: 999,
        };
        const res = await api.field.getPlaceList(option);
        // console.log("res", res);
        const { code, data, count } = res.data;
        if (code == 200) {
          let fieldListx = data;
          for (let i = 0; i < fieldListx.length; i++) {
            fieldListx[i].CreationTime = getTrueTime(fieldListx[i].CreationTime);
            fieldListx[i].EndTime = getTrueTime1(fieldListx[i].EndTime);
          }
          fromConfig.count = count;
          // let arrfrom = [];
          // arrfrom = fieldList.value;
          // arrfrom.push(fieldListx[0]);

          fieldList.value = fieldListx;
          console.log(".fieldList.length", fieldList.value);
        }
      } catch (err) {
        console.log("err", err);
      }
    };

    return {
      ...from,
      fieldList,
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      tolist,
      goback,
    };
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
    margin-top: 52px;
    z-index: 1003;
    position: absolute;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    .fie-list-box {
      background: #ffffff;
      //   margin-top: 52px;
      width: 345px;
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .fie-list-box-img {
        margin-right: 13px;
        width: 15px;
        height: 15px;
      }
      .fie-list-box-list {
        margin: 15px 0 15px 15px;
        display: flex;
        flex-direction: column;
        .box-list-title {
          display: flex;
          flex-direction: row;
          font-size: 18px;
          line-height: 18px;
          color: #333333;
        }
        .box-list-time {
          margin-top: 11px;
          display: flex;
          flex-direction: row;
          font-size: 16px;
          line-height: 16px;
          color: #333333;
        }
      }
    }
    .fiex-top {
      margin-top: 15px;
    }
  }
}
</style>
