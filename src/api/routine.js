import {Api} from "@/api/api";

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ""}`
    }

    static async add(routine) {
        const aux =  await Api.post(RoutineApi.getUrl(),routine)
        return aux.id
    }

    static async modify(routine) {
        return await Api.put(RoutineApi.getUrl(routine.id), routine)
    }

    static async delete(id) {
        return await Api.delete(RoutineApi.getUrl(id))
    }

    static async getAll() {
        return await Api.get(RoutineApi.getUrl())
    }

    static async get(id) {
        return await Api.get(RoutineApi.getUrl(id))
    }
}

export {RoutineApi}