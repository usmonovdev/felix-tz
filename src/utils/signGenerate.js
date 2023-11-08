import md5 from "md5"

export const generateSign = (method, body, url) => {
    const secret = localStorage.getItem("secret");
    if (body.length == 0 || body == undefined) {
        const structure = `${method}${url}${secret}`
        return md5(structure)
    } else {
        const structure = `${method}${url}${JSON.stringify(body)}${secret}`
        return md5(structure)
    }
}