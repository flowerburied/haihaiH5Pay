import axios from '../../utils/request.js'

let pay = {
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