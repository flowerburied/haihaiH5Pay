<template>
  <div class="field">
    <div class="field-box">
      <div class="field-box-bg">
        <img class="field-box-img" src="../../assets/11.png" />
      </div>

      <div class="field-box-tab" @click="goback">
        <div class="field-tab-text">嗨嗨充值中心</div>
        <!-- <img class="field-tab-img" src="../../assets/back.png" /> -->
      </div>

      <div class="home-box-con">
        <div class="pay-text">请输入嗨嗨账号</div>
        <div class="pay-box">
          <div class="pay-box-input">
            <van-field
              @update:model-value="update"
              :rules="[{ required: true, message: '请填写用户名' }]"
              v-model="account.id"
              label-width="56"
              placeholder="请输入ID"
              label="嗨嗨ID："
            />
          </div>
          <div class="pay-box-input">
            <!-- <van-field
              label-width="56"
              v-model="result"
              is-link
              readonly
              name="picker"
              label="昵 称："
              placeholder="点击选择昵称"
              @click="showPicker = true"
            />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup> -->

            <van-field
              disabled
              :rules="[{ required: true, message: '请填写用户名' }]"
              v-model="account.name"
              label-width="56"
              placeholder="请输入昵称"
              label="昵   称："
            />
          </div>
        </div>
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
        <div class="pay-text">选择充值面额</div>

        <div class="pay-change-money">
          <div
            class="change-money-box"
            @click="getchange(index)"
            v-for="(item, index) in changemoney"
            :key="index"
            :class="[isget == index ? 'money_border' : '']"
          >
            <div class="money-box-con">
              <div class="box-con-value1">
                <img class="con-value-img" src="../../assets/pay/04.png" />
                <!-- <p class="con-value-text"> {{ item.num }}</p> -->
                <div class="con-value-text">{{ item.num }}</div>
              </div>

              <div class="box-con-money">{{ item.money }}</div>
            </div>

            <img
              v-if="isget == index"
              class="money-box-isget"
              src="../../assets/pay/03.png"
            />
          </div>
        </div>
        <div class="pay-textwx">*如有疑问可添加客服微信：haihaiyuyinlefu</div>

        <div class="pay_agreement">
          <img v-if="true" class="pay_agreement_quan" src="../../assets/pay/04.png" />
          <img v-if="false" class="pay_agreement_quan" src="../../assets/pay/05.png" />
          <div class="pay_agreement_text">我已阅读并同意</div>
          <div class="pay_agreement_link">《用户充值协议》</div>
        </div>

        <div class="pay-btn" @click="clickpay">确认支付</div>

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
        id: "",
        name: "",
      },
      ispayType: false,
      changemoney: [
        { num: 600, money: "￥6.00" },
        { num: 3000, money: "￥30.00" },
        { num: 6800, money: "￥68.00" },
        { num: 11800, money: "￥118.00" },
      ],
      result: "",
      showPicker: false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
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
          // http://h5pay.haihaixingqiu.com/#/
          // let redirect_url="http://h5pay.haihaixingqiu.com/#/"
          let mergeurl =
            data.mweb_url + "&redirect_url=http://h5pay.haihaixingqiu.com/#/";
          console.log("mergeurl", mergeurl);

           window.location.href = mergeurl;
          // let routeData = proxy.$router.resolve({
          //   path: "/aliPay",
          //   query: {
          //     htmlData: mergeurl,
          //   },
          // });

          // window.open(routeData.href, "_ blank");
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    const clickalipay = async () => {
      try {
        let option = {
          price: fromConfig.changemoney[fromConfig.isget].num / 100,
          type: "Android",
          rand_id: fromConfig.account.id,
        };
        console.log("option", option);
        const res = await api.pay.H5AliPay(option);

        console.log("res", res);
        const { code, data } = res;
        if (code == 0) {
          console.log("data", data);
 window.location.href = data;


          // let routeData = proxy.$router.resolve({
          //   path: "/aliPay",
          //   query: {
          //     htmlData: data,
          //   },
          // });

          // window.open(routeData.href, "_ blank");


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

    const getusername = async (val) => {
      try {
        let option = {
          rand_id: val,
        };
        console.log("option", option);
        const res = await api.pay.RandIdGetUserInfo(option);

        console.log("res", res);
        const { code, data } = res;
        if (code == 0) {
          console.log("data", data);
          if (data) {
            fromConfig.account.name = data.nickname;
          }else{
              fromConfig.account.name =''
          }
        }
      } catch (err) {
        console.log("err", err);
      }
    };

    const onConfirm = (value) => {
      fromConfig.result = value;
      fromConfig.showPicker = false;
    };

    const update = (val) => {
      console.log("val", val);
      if (val.length > 2) {
        getusername(val);
      }
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
      onConfirm,
      update,
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
