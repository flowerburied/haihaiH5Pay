<template>
  <div class="field">
    <div class="field-box">
      <div class="field-box-bg">
        <!-- <img class="field-box-img" src="../../assets/11.png" /> -->
      </div>

      <div class="field-box-tab">
        <div class="field-tab-text">申请提现</div>
        <img @click="goback" class="field-tab-img" src="../../assets/back.png" />
        <div class="pay_jl" @click="toRecord">提现记录</div>
      </div>

      <div class="home-box-con">
        <div class="pay-text">选择支付方式</div>
        <div class="pay-box">
          <div class="pay-box-input" @click="changepayType">
            <div class="pay-left">
              <img class="pay-img" src="../../assets/pay/01.png" />
              <div class="pay-text1">支付宝</div>
            </div>
            <div class="pay-right">
              <img v-if="!ispayType" class="pay-img-quan" src="../../assets/pay/04.png" />
              <img v-if="ispayType" class="pay-img-quan" src="../../assets/pay/05.png" />
            </div>
          </div>
          <div class="pay-box-input" @click="changepayType">
            <div class="pay-left">
              <img class="pay-img" src="../../assets/pay/02.png" />
              <div class="pay-text1">微信</div>
            </div>
            <div class="pay-right">
              <img v-if="ispayType" class="pay-img-quan" src="../../assets/pay/04.png" />
              <img v-if="!ispayType" class="pay-img-quan" src="../../assets/pay/05.png" />
            </div>
          </div>
        </div>

        <div class="pay-text">可提现金额 {{ $store.state.userinfo.integral / 100 }}</div>
        <div class="pay-box" style="height: 44px">
          <div class="pay-box-input">
            <van-field
              :rules="[{ required: true, message: '提现金额需为10的倍数' }]"
              v-model="account.money"
              label-width="56"
              placeholder="提现金额最小为一百"
              label="提现金额"
            />
          </div>
        </div>

        <div class="pay-text" v-if="!ispayType">提现账号</div>
        <div class="pay-box" v-if="!ispayType">
          <div class="pay-box-input">
            <van-field
              :rules="[{ required: true, message: '支付宝账号' }]"
              v-model="account.name"
              label-width="56"
              placeholder="支付宝账号"
            />
          </div>
          <div class="pay-box-input">
            <van-field
              :rules="[{ required: true, message: '收款人真实姓名' }]"
              v-model="account.accountid"
              label-width="56"
              placeholder="收款人真实姓名"
            />
          </div>
        </div>

        <div class="pay-btn" @click="clickpay">确认申请</div>

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
        money: "",
        name: "",
        accountid: "",
      },

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
    const toRecord = () => {
      router.push({
        path: "/record",
      });
    };

    const goback = () => {
      console.log("fabhui");
      router.go(-1);
    };
    const clickpay = async () => {
      if (fromConfig.ispayType) {
        if (fromConfig.account.money) {
          // clickwxpay();
          Notify("微信提现暂未开通");
        } else {
          Notify("请填写完整");
        }
      } else {
        if (
          fromConfig.account.money &&
          fromConfig.account.name &&
          fromConfig.account.accountid
        ) {
          clickalipay();
        } else {
          Notify("请填写完整");
        }
      }
      // if (fromConfig.account.id && fromConfig.account.name) {
      //   if (fromConfig.ispayType) {
      //     clickwxpay();
      //   } else {
      //     clickalipay();
      //   }
      // } else {
      //   Notify("请输入啵咿账号信息");
      // }
    };
    const clickwxpay = async () => {
      try {
        let option = {
          uid: proxy.$store.state.userinfo.userId,
          money: fromConfig.account.money,
          type: 2,
          name: fromConfig.account.name,
          account: fromConfig.account.accountid,
        };
        console.log("option", option);
        const res = await api.pay.ApplyWithdrawa(option);

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
          uid: proxy.$store.state.userinfo.userId,
          money: fromConfig.account.money * 100,
          type: 1,
          name: fromConfig.account.name,
          account: fromConfig.account.accountid,
        };
        console.log("option", option);
        const res = await api.pay.ApplyWithdrawa(option);

        console.log("res", res);
        const { code, data,message } = res;
        if (code == 0) {
          // console.log("data", data);
          Notify({ type: "success", message: "申请提现成功" });

          setTimeout(() => {
            router.go(-1);
          }, 2000);
        } else {
          Notify({ type: "danger", message: message });
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    const onSubmit = (values) => {
      console.log("submit", values);
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
      toRecord,
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
    .pay_jl {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 14px;
      line-height: 14px;
      text-decoration: underline;
      color: #027aff;
    }
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
    .pay-text {
      margin-top: 20px;
      color: #3c251c;
      width: 345px;
      font-size: 14px;
      line-height: 14px;
      display: flex;
      flex-direction: row;
    }
    .pay-textwx {
      margin-top: 20px;
      color: #999999;
      width: 345px;
      font-size: 12px;
      line-height: 12px;
      display: flex;
      flex-direction: row;
    }
    .pay-btn {
      margin-top: 44px;
      padding: 13px 42px;
      border-radius: 20px;
      font-size: 14px;
      line-height: 14px;
      color: #ffffff;
      background: #e95583;
    }
    .pay_agreement {
      margin-top: 20px;
      color: #3c251c;
      width: 345px;
      font-size: 14px;
      line-height: 14px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .pay_agreement_quan {
        width: 10px;
        height: 10px;
      }
      .pay_agreement_text {
        margin-left: 5px;
      }
      .pay_agreement_link {
        color: #027aff;
        text-decoration: underline;
      }
    }
    .pay-change-money {
      width: 368px;
      margin: -5px 0 0 -22px;
      display: flex;
      flex-wrap: wrap;

      .money_border {
        border: 1px solid #e4b569;
      }
      .change-money-box {
        margin: 10px 0 0 22px;
        position: relative;
        width: 100px;
        height: 70px;
        background: #ffffff;
        border-radius: 4px;

        .money-box-con {
          width: 100px;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .box-con-money {
            margin-top: 10px;
            font-size: 10px;
            line-height: 10px;
            color: #3c251c;
          }
          .box-con-value1 {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .con-value-img {
              width: 15px;
              height: 15px;
            }
            .con-value-text {
              display: inline-block;
              font-size: 14px;
              line-height: 14px;
              margin-left: 12px;
              color: #fdc72f;
            }
          }
        }
        .money-box-isget {
          width: 20px;
          height: 20px;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }

    .pay-box {
      margin-top: 5px;
      width: 345px;
      height: 100px;
      background: #ffffff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;

      .pay-box-input {
        width: 345px;
        height: 50px;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        .pay-left {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          // justify-content: center;
          margin-left: 17px;
          .pay-img {
            width: 29px;
            height: 29px;
          }
          .pay-text1 {
            font-size: 14px;
            line-height: 14px;
            color: #3c251c;
            margin-left: 7px;
          }
        }
        .pay-right {
          width: 10px;
          height: 10px;
          margin-right: 19px;
          .pay-img-quan {
            width: 10px;
            height: 10px;
          }
        }

        .box-input-text {
          display: flex;
          flex-direction: row;
          margin-left: 18px;
          font-size: 14px;
          line-height: 14px;
          color: #3c251c;
        }
      }
    }
  }
}
</style>
