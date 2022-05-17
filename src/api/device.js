import {Api} from "@/api/api";

class DeviceApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`
    }

    static async add(device) {
        const aux =  await Api.post(DeviceApi.getUrl(),device)
        return aux.id
    }

    static async modify(device) {
        const picked = (({ name, meta }) => ({ name, meta }))(device);
        return await Api.put(DeviceApi.getUrl(device.id), picked)
    }

    static async delete( id) {
        return await Api.delete(DeviceApi.getUrl(id))
    }

    static async getAll() {
        return await Api.get(DeviceApi.getUrl())
    }

    static async get(id) {
        return await Api.get(DeviceApi.getUrl(id))
    }

    static async action(id, actionName, param) {
        const url = DeviceApi.getUrl(id)+ `/${actionName}`
        const par = param ? [param] : param
        return await Api.put(url, par)
    }
}

export {DeviceApi}