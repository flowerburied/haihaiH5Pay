<template>
  <div class="volunteer">
    <div class="field-box">
      <!-- <img class="field-box-bg" src="../assets/weel.png" /> -->
      <div class="field-box-bg">
        <img class="field-box-img" src="../assets/bg.png" />
      </div>

      <div class="home-box-bg" v-if="isregister">
        <van-form @submit="verCode">
          <div class="box-bg-title">请输入志愿者密码</div>

          <van-cell-group inset>
            <van-field
              v-model="username"
              name="id_card"
              label="验证码"
              placeholder="验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>

      <div class="field-box-tab" @click="goback">
        <div class="field-tab-text">志愿者增补</div>
        <!-- <img class="field-tab-img" src="../assets/back.png" /> -->
      </div>

      <div class="home-box-con">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="name"
              name="name"
              label="姓名"
              placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field
              v-model="sex"
              is-link
              readonly
              name="sex"
              label="性别"
              placeholder="性别"
              :rules="[{ required: true, message: '请选择性别', trigger: 'change' }]"
              @click="showSex = true"
            />
            <van-popup v-model:show="showSex" position="bottom">
              <van-picker
                :columns="columnsSex"
                @confirm="onConSex"
                @cancel="showSex = false"
              />
            </van-popup>

            <van-field
              v-model="id_card"
              name="id_card"
              label="公民身份证号"
              placeholder="公民身份证号"
              :rules="[{ required: true, message: '请填写公民身份证号' }]"
            />
            <van-field
              v-model="phone"
              name="phone"
              label="联系电话"
              placeholder="联系电话"
              :rules="[{ required: true, message: '请填写联系电话' }]"
            />

            <van-field
              v-model="address"
              is-link
              readonly
              name="picker"
              label="家庭住址"
              placeholder="请选择区或者村落"
              @click="showPicker = true"
              :rules="[
                { required: true, message: '请选择区或者村落', trigger: 'change' },
              ]"
            />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>

            <van-field
              v-model="addressnum"
              name="addressnum"
              label="门牌号或者单元"
              placeholder="门牌号或者单元"
              :rules="[{ required: true, message: '请填写门牌号或者单元' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
// nextTick
import { onMounted, getCurrentInstance, reactive, toRefs } from "vue";
// import { useRouter } from "vue-router";
import { Notify } from "vant";
// import { useStore } from "vuex";
// import { qrcanvas } from "qrcanvas";
import api from "../api/api.js";
export default {
  name: "field",
  setup() {
    onMounted(() => {
      getfun();
    });

    // proxy相当于vue2的this对象
    const { proxy } = getCurrentInstance();
    console.log("proxy", proxy);
    const fromConfig = reactive({
      isregister: true,
      columns: [],
      showPicker: false,
      result: "",
      username: "",
      password: "",
      name: "",
      sex: "",
      id_card: "",
      phone: "",
      address: "",
      addressnum: "",
      showSex: false,
      columnsSex: ["男", "女"],
    });

    const from = toRefs(fromConfig);

    const getfun = async () => {
      try {
        let option = {
          page: 1,
          size: 999,
        };
        const res = await api.field.Getvillage(option);
        console.log("res", res);
        const { data, code } = res.data;
        if (code == 200) {
          let getlist = [];
          for (let i = 0; i < data.length; i++) {
            getlist.push(data[i].VillageName);
          }
          //   console.log("getlist", getlist);
          fromConfig.columns = getlist;
        } else {
          console.log("errrr");
        }
      } catch (err) {
        console.log("err", err);
      }
    };

    const onSubmit = (values) => {
      console.log("submit", values);
      submitForm();
    };

    const submitForm = async () => {
      try {
        let option = {
          name: fromConfig.name,
          sex: fromConfig.sex,
          address: fromConfig.address + "-" + fromConfig.addressnum,
          id_card: fromConfig.id_card,
          phone: fromConfig.phone,
          id: 0,
        };
        const res = await api.field.CreateResidentInfo(option);
        console.log("res", res);
        const { code } = res.data;
        if (code == 200) {
          fromConfig.name = "";
          fromConfig.sex = "";
          fromConfig.address = "";
          fromConfig.addressnum = "";
          fromConfig.id_card = "";
          fromConfig.phone = "";
          Notify({ type: "success", message: "提交成功" });
        } else {
          console.log("errrr");
          Notify({ type: "danger", message: "提交失败" });
        }
      } catch (err) {
        console.log("err", err);
        Notify({ type: "danger", message: "提交失败" });
      }
    };

    const onConfirm = (value) => {
      fromConfig.address = value;
      fromConfig.showPicker = false;
    };

    const onConSex = (value) => {
      fromConfig.sex = value;
      fromConfig.showSex = false;
    };

    const verCode = (values) => {
      console.log("verCode", values);
      if (values.id_card == "6688") {
        console.log("通过");
        fromConfig.isregister = false;
      } else {
        Notify({ type: "danger", message: "验证失败" });
      }
    };

    return {
      ...from,
      onSubmit,
      onConfirm,
      onConSex,
      verCode,
    };
  },
};
</script>

<style lang="scss">
.volunteer {
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

  .home-box-bg {
    // background-image: url(../assets/weel.png);
    z-index: 1100;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
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
