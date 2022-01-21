<template>
  <div class="field">
    <div class="field-box">
      <div class="field-box-bg">
        <!-- <img class="field-box-img" src="../../assets/11.png" /> -->
      </div>

      <div class="field-box-tab" @click="goback">
        <div class="field-tab-text">嗨嗨充值中心</div>
        <!-- <img class="field-tab-img" src="../../assets/back.png" /> -->
      </div>

      <div class="home-box-con">
        <div class="core_first">
          <div class="core_first_left">
            <img class="first_left_img" :src="$store.state.userinfo.head" />

            <div class="first_left_text">
              {{ $store.state.userinfo.nickname }} ID: {{ $store.state.userinfo.randId }}
            </div>
          </div>

          <div class="core_first_right" @click="outlogin">退出</div>
        </div>

        <div class="core_second">
          <div class="core_second_title">我的收益</div>

          <div class="core_second_box">
            <div class="second_box_text">当前财产：</div>

            <div class="second_box_box">
              <div class="box_box_left">
                <img class="box_left_img" src="../../assets/pay/08.png" />
                <div class="box_left_money">
                  {{ $store.state.userinfo.integral || 0 }}
                </div>
              </div>
              <div class="box_box_left">
                <img class="box_left_img" src="../../assets/pay/07.png" />
                <div class="box_left_money">{{ $store.state.userinfo.balance || 0 }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="core_third">
          <img class="core_third_bg" src="../../assets/pay/12.png" />
          <div class="core_third_box">
            <div class="third_box_box" @click="topayWithdrawal">
              <div class="box_box_left">可提取佣金（人民币）</div>
              <div class="box_box_right">申请佣金</div>
            </div>
            <div class="third_box_num">{{ $store.state.userinfo.integral / 100 }}</div>
          </div>
        </div>
        <!-- <div class="core_fourth">
          <div class="core_fourth_box" v-for="i of 4" :key="i">
            <div class="fourth_box_text">本周收益（元）</div>
            <div class="fourth_box_money">本周收益（元）</div>
          </div>
        </div> -->

        <div class="core_fifth">
          <div class="core_fifth_box" v-for="(item, indfif) in fifthList" :key="indfif">
            <div class="fifth_box_left">
              <img class="box_left_img" :src="item.img" />
              <div class="box_left_text">{{ item.text }}</div>
            </div>
            <img class="fifth_box_right" src="../../assets/pay/13.png" />
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
export default {
  setup() {
    const fromConfig = reactive({
      // fieldList: [],
      page: 1,
      nomore: 1,
      count: 0,
      isget: 0,
      account: {
        id: "51976",
        name: "",
      },

      ispayType: false,
      fifthList: [
        { img: require("@/assets/pay/09.png"), text: "兑换金币" },
        { img: require("@/assets/pay/10.png"), text: "佣金记录" },
        { img: require("@/assets/pay/11.png"), text: "绑定银行卡" },
      ],
    });
    const from = toRefs(fromConfig);
    // proxy相当于vue2的this对象
    const { proxy } = getCurrentInstance();
    console.log("proxy", proxy);
    const router = useRouter();

    // payWithdrawal

    const topayWithdrawal = () => {
      router.push({
        path: "/payWithdrawal",
      });
    };

    const changepayType = () => {
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
    const clickpay = async () => {
      if (fromConfig.account.id && fromConfig.account.name) {
        if (fromConfig.ispayType) {
          clickwxpay();
        } else {
          clickalipay();
        }
      } else {
        Notify("请输入嗨嗨账号信息");
      }
    };
    const clickwxpay = async () => {
      try {
        let option = {
          price: fromConfig.changemoney[fromConfig.isget].num,
          type: "Android",
          rand_id: fromConfig.account.id,
        };
        console.log("option", option);
        const res = await api.pay.H5WxPay(option);

        console.log("res", res);
        const { code, data } = res;
        if (code == 0) {
          console.log("data", data);
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    const clickalipay = async () => {
      try {
        let option = {
          price: fromConfig.changemoney[fromConfig.isget].num,
          type: "Android",
          rand_id: fromConfig.account.id,
        };
        console.log("option", option);
        const res = await api.pay.H5AliPay(option);

        console.log("res", res);
        const { code, data } = res;
        if (code == 0) {
          console.log("data", data);

          let routeData = proxy.$router.resolve({
            path: "/aliPay",
            query: {
              htmlData: data,
            },
          });

          window.open(routeData.href, "_ blank");
          // const div = document.createElement("div");
          // div.innerHTML = `<form id="alipaysubmit" name="alipaysubmit"
          //                  :action="${data}"
          //                  method="POST" ></form>`;
          // document.body.appendChild(div);

          // console.log("document.getElememi", document.getElementById("alipaysubmit"));
          // document.getElementById("alipaysubmit").submit();
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    const onSubmit = (values) => {
      console.log("submit", values);
    };
    const outlogin = () => {
      proxy.$store.commit("SET_USER_INFO", null);
      router.push({
        path: "/signup",
      });
    };

    return {
      ...from,
      tolist,
      goback,
      clickalipay,
      clickpay,
      getchange,
      changepayType,
      onSubmit,
      topayWithdrawal,
      outlogin,
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
    .core_fifth {
      margin-top: 8px;
      width: 345px;
      height: 134px;
      background: #ffffff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .core_fifth_box {
        width: 345px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        .fifth_box_right {
          margin-right: 12px;
          width: 7px;
          height: 7px;
        }
        .fifth_box_left {
          display: flex;
          align-items: center;
          flex-direction: row;
          .box_left_img {
            width: 20px;
            height: 20px;
            margin-left: 13px;
          }
          .box_left_text {
            font-size: 14px;
            line-height: 14px;
            margin-left: 7px;
          }
        }
      }
    }
    .core_fourth {
      margin-top: 8px;
      width: 345px;
      height: 115px;
      background: #ffffff;
      border-radius: 4px;
      display: flex;
      // flex-direction: column;
      // position: relative;
      flex-wrap: wrap;
      justify-content: space-between;
      .core_fourth_box {
        margin-top: 15px;
        width: 172px;
        display: flex;
        flex-direction: column;
        color: #3c251c;
        .fourth_box_text {
          font-size: 10px;
          line-height: 10px;
        }
        .fourth_box_money {
          font-size: 14px;
          line-height: 14px;
          margin-top: 7px;
        }
      }
    }
    .core_third {
      margin-top: 8px;
      width: 345px;
      height: 125px;
      background: #ffffff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      position: relative;
      .core_third_bg {
        width: 345px;
        height: 125px;
        position: absolute;
      }
      .core_third_box {
        position: absolute;
        width: 345px;
        height: 125px;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        .third_box_num {
          display: block;
          margin: 27px 0 0 18px;
          font-size: 40px;
          line-height: 40px;
          color: #f1b797;
          display: flex;
        }
        .third_box_box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 11px;
          .box_box_left {
            margin-left: 15px;
            font-size: 12px;
            line-height: 12px;
            color: #f1b797;
          }
          .box_box_right {
            margin-right: 14px;
            font-size: 11px;
            line-height: 11px;
            padding: 7px 9px;
            color: #ffffff;
            background: #8a6b36;
            border-radius: 12px;
          }
        }
      }
    }
    .core_second {
      margin-top: 8px;
      width: 345px;
      height: 100px;
      background: #ffffff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      .core_second_title {
        font-size: 14px;
        line-height: 14px;
        margin-top: 16px;
        color: #3c251c;
      }
      .core_second_box {
        margin-top: 41px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .second_box_text {
          width: 95px;
          margin-left: 15px;

          font-size: 14px;
          line-height: 14px;
          color: #3c251c;
        }
        .second_box_box {
          width: 100%;
          display: flex;
          flex-direction: row;
          .box_box_left {
            display: flex;
            flex: 1;
            // background: chartreuse;
            flex-direction: row;
            align-items: center;
            .box_left_img {
              width: 15px;
              height: 15px;
            }
            .box_left_money {
              margin-left: 13px;
              font-size: 14px;
              line-height: 14px;
              color: #3c251c;
            }
          }
        }
      }
    }

    .core_first {
      width: 345px;
      height: 70px;
      border-radius: 7px;
      background: #ffffff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .core_first_right {
        border-radius: 5px;
        margin-right: 10px;
        padding: 7px 10px;
        font-size: 11px;
        line-height: 11px;
        color: #ffffff;
        background: linear-gradient(90deg, #b050ed, #7c50ed);
      }
      .core_first_left {
        display: flex;
        flex-direction: row;
        align-items: center;
        .first_left_img {
          margin-left: 10px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .first_left_text {
          margin-left: 10px;
          font-size: 14px;
          line-height: 14px;
          color: #3c251c;
        }
      }
    }
  }
}
</style>
