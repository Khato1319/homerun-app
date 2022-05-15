import {Api} from "@/api/api";

class RoomApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ""}`
    }

    static async add(roomName) {
        const aux =  await Api.post(RoomApi.getUrl(), {name: roomName, meta: {}})
        return aux.id
    }

    static async modify(room) {
        return await Api.put(RoomApi.getUrl(room.id), room)
    }

    static async delete(id) {
        return await Api.delete(RoomApi.getUrl(id))
    }

    static async getAll() {
        return await Api.get(RoomApi.getUrl())
    }

    static async get(id) {
        return await Api.get(RoomApi.getUrl(id))
    }
    static async bindDeviceToRoom(deviceId, roomId) {
        return await Api.post(RoomApi.getUrl(roomId) + `/devices/${deviceId}`)
    }
}

export {RoomApi}