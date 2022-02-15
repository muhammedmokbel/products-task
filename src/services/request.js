import axios from '../axiosconfig'

const request = (serviceObject) => axios(serviceObject)
    .then(res => {
        return res

    })
    .catch(err => {
        console.log(err)
    })

export default request