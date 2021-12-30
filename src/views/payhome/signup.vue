<template>
  <div class="field">
    <div class="field-box">
      <div class="field-box-bg">
        <img class="field-box-img" src="../../assets/11.png" />
      </div>

      <div class="field-box-tab" @click="goback">
        <div class="field-tab-text">登录</div>
        <!-- <img class="field-tab-img" src="../../assets/back.png" /> -->
      </div>

      <div class="home-box-con">
        <img class="logo_haihai" src="../../assets/pay/06.png" />
        <!-- <div class="pay-text">可提现金额  2987.62</div> -->
        <div class="pay-box" style="height: 88px; margintop: 113px">
          <!-- <div class="pay-box-input">
            <van-field
              :rules="[{ required: true, message: '请输入用户ID' }]"
              v-model="account.id"
              label-width="56"
              placeholder="请输入用户ID"
              label="ID"
            />
          </div> -->
          <div class="pay-box-input">
            <van-field
              :rules="[{ required: true, message: '请输入绑定的手机号' }]"
              v-model="account.phone"
              label-width="56"
              placeholder="请输入绑定的手机号"
              label="手机号"
            />
          </div>
          <div class="pay-box-input">
            <van-field
              :rules="[{ required: true, message: '请输入验证码' }]"
              v-model="account.code"
              label-width="56"
              placeholder="请输入验证码"
              label="验证码"
            >
              <template #button>
                <div v-if="codetimeout" class="signup_btn" @click="getcode">
                  获取验证码
                </div>
                <div v-if="!codetimeout" class="signup_btn">倒计时：{{ numtime }}</div>
                <!-- <van-button size="small" type="primary">发送验证码</van-button> -->
              </template>
            </van-field>
          </div>
        </div>

        <div class="pay-btn" @click="clickpay">验证登录</div>

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
import { mapMutation } from "vuex";
export default {
  setup() {
    const fromConfig = reactive({
      codetimeout: true,
      numtime: 60,
      // fieldList: [],
      page: 1,
      nomore: 1,
      count: 0,
      isget: 0,
      account: {
        id: "",
        phone: "15251609976",
        code: "",
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
      if (fromConfig.account.phone && fromConfig.account.code) {
        let regPhong = /^1[3456789]\d{9}$/;
        // return regPhong.test(value)
        let isphone = regPhong.test(fromConfig.account.phone);
        console.log("isphone", isphone);

        if (isphone) {
          singnuptrue();
        }
      } else {
        Notify("请输入嗨嗨账号信息");
      }
    };
    const singnuptrue = async () => {
      try {
        let option = {
          code: fromConfig.account.code,
          phone: fromConfig.account.phone,
        };
        console.log("option", option);
        const res = await api.pay.login(option);

        console.log("res", res);
        const { code, data } = res;
        if (code == 0) {
          proxy.$store.commit("SET_USER_INFO", data);
          let testuse = JSON.stringify(data);
          sessionStorage.setItem("userinfo", testuse);
          console.log("data", proxy.$store.state.userinfo);

          router.push({
            path: "/core",
          });
        }
      } catch (err) {
        console.log("err", err);
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

    const getcode = async () => {
      try {
        let option = {
          phone: fromConfig.account.phone,
        };
        console.log("option", option);
        const res = await api.pay.TencentSendSms(option);

        console.log("TencentSendSms", res);
        const { code, data } = res;
        if (code == 0) {
          fromConfig.numtime = 60;
          fromConfig.codetimeout = false;
          setTimeout(() => {
            fromConfig.codetimeout = true;
          }, 3000);
          getTime();
          console.log("data", data);
        }
      } catch (err) {
        console.log("err", err);
      }
    };

    const getTime = () => {
      let interval = setInterval(() => {
        fromConfig.numtime--;
        if (fromConfig.numtime == 0) {
          clearInterval(interval);
        }
      }, 1000);
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
      getcode,
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
    .signup_btn {
      color: #e95583;
    }
    .logo_haihai {
      margin-top: 80px;

      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

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
