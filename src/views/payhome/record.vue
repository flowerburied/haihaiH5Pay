<template>
  <div class="field">
    <div class="field-box">
      <div class="field-box-bg">
        <!-- <img class="field-box-img" src="../../assets/11.png" /> -->
      </div>

      <div class="field-box-tab">
        <div class="field-tab-text">申请提现</div>
        <img @click="goback" class="field-tab-img" src="../../assets/back.png" />
      </div>

      <div class="home-box-con">
        <div class="record_box">
          <div class="record_box_box" v-for="(it, ind) in recordlist" :key="it">
            <div class="box_box_left">
              <img
                class="box_left_img"
                v-if="it.type == 1"
                src="../../assets/pay/01.png"
              />
              <img
                class="box_left_img"
                v-if="it.type != 1"
                src="../../assets/pay/02.png"
              />
              <div class="box_left_box">
                <div class="left_box_text">提现成功</div>
                <div class="left_box_time">{{ getTrueTime1(it.createTime) }}</div>
              </div>
            </div>

            <div class="box_box_right">{{ it.money }}</div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<script>
// nextTick
import { ref, onMounted, getCurrentInstance, reactive, toRefs, nextTick } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";
import { Notify } from "vant";
import getTrueTime from "@/utils/getTime";
export default {
  setup() {
    const fromConfig = reactive({
      // fieldList: [],
      page: 1,
      nomore: 1,
      count: 0,
      isget: 0,
      account: {
        money: "",
        name: "",
        accountid: "",
      },
      recordlist: [],
      ispayType: false,
      changemoney: [
        { num: 0.01, money: "￥6.00" },
        { num: 600, money: "￥6.00" },
        { num: 600, money: "￥6.00" },
        { num: 600, money: "￥6.00" },
      ],
    });
    const from = toRefs(fromConfig);
    // proxy相当于vue2的this对象
    const { proxy } = getCurrentInstance();
    console.log("proxy", proxy);
    const router = useRouter();

    const changepayType = () => {
      fromConfig.account.accountid = "";
      fromConfig.account.name = "";
      fromConfig.ispayType = !fromConfig.ispayType;
    };

    const getchange = (ind) => {
      console.log("ind", ind);
      fromConfig.isget = ind;
    };

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
    const onSubmit = (values) => {
      console.log("submit", values);
    };

    const getlist = async () => {
      try {
        let option = {
          uid: proxy.$store.state.userinfo.userId,
          page: 1,
          page_size: 999,
        };
        console.log("option", option);
        const res = await api.pay.WithdrawaLog(option);

        console.log("res", res);
        const { code, data } = res;
        if (code == 0) {
          fromConfig.recordlist = data.list;

          console.log("data", data);
        }
      } catch (err) {
        console.log("err", err);
      }
    };

    const getTrueTime1 = (val) => {
      return getTrueTime(val);
    };
    getlist();
    return {
      ...from,
      tolist,
      goback,

      getchange,
      changepayType,
      onSubmit,
      getTrueTime1,
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
    // background: #ffffff;
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
      font-weight: bold;
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
    .record_box {
      width: 345px;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .record_box_box {
        margin-top: 1px;
        border-radius: 4px;
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ffffff;
        .box_box_left {
          display: flex;
          flex-direction: row;
          align-items: center;
          .box_left_img {
            margin-left: 7px;
            border-radius: 50%;
            width: 29px;
            height: 29px;
          }
          .box_left_box {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            .left_box_text {
              display: flex;
              font-size: 14px;
              line-height: 14px;
              color: #3c251c;
            }
            .left_box_time {
              margin-top: 9px;
              font-size: 10px;
              line-height: 10px;
              color: #999999;
            }
          }
        }
        .box_box_right {
          margin-right: 12px;
          font-size: 16px;
          line-height: 16px;
          color: #3c251c;
        }
      }
    }
  }
}
</style>
