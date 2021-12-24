import axios from '../../utils/request.js'
import qs from 'qs'
let field = {
    // 场地列表
    getPlaceList(data) {
        return axios({
            url: '/H5/getPlaceList',
            method: 'post',
            data: qs.stringify(data)
        })
    },
    // 获取openid
    GetOpenid(data) {
        return axios({
            url: '/H5/GetOpenid',
            method: 'post',
            data: qs.stringify(data)
        })
    },
    // 登录
    Login(data) {
        return axios({
            url: '/H5/Login',
            method: 'post',
            data: qs.stringify(data)
        })
    },
    // 录入居民信息
    CreateResidentInfo(data) {
        return axios({
            url: '/H5/CreateResidentInfo',
            method: 'post',
            data: qs.stringify(data)
        })
    },
    // 获取小区或村落
    Getvillage(data) {
        return axios({
            url: '/H5/Getvillage',
            method: 'post',
            data: qs.stringify(data)
        })
    },

}

export default field