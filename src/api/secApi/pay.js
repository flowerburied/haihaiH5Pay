import axios from '../../utils/request.js'

let pay = {
    //H5 rand_id获取用户信息
    RandIdGetUserInfo(data) {
        return axios({
            url: '/User/RandIdGetUserInfo',
            method: 'post',
            data: data
        })
    },
    //提现
    WithdrawaLog(data) {
        return axios({
            url: '/Withdrawal/WithdrawaLog',
            method: 'post',
            data: data
        })
    },
    //提现
    ApplyWithdrawa(data) {
        return axios({
            url: '/Withdrawal/ApplyWithdrawa',
            method: 'post',
            data: data
        })
    },
    //提现验证
    login(data) {
        return axios({
            url: '/Withdrawal/login',
            method: 'post',
            data: data
        })
    },
    //腾讯云短信
    TencentSendSms(data) {
        return axios({
            url: '/Api/TencentSendSms',
            method: 'post',
            data: data
        })
    },
    // h5 微信支付
    H5WxPay(data) {
        return axios({
            url: '/pay/H5WxPay',
            method: 'post',
            data: data
        })
    },
    // h5 支付宝支付
    H5AliPay(data) {
        return axios({
            url: '/pay/H5AliPay',
            method: 'post',
            data: data
        })
    },



}

export default pay