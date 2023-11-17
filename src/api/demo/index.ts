import request from '~/utils/request';

export const get_demo = async (param_value: any) => {
    try {
        const response = await request.get("/get_demo", { params: { param_name: param_value } });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const post_demo = async (data: any) => {
    // data为json格式
    try {
        const response = await request.post("/post_demo", data);
        return response;
    } catch (error) {
        console.log(error);
    }
}
