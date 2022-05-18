async function request(method, url, token, data = {}, encode = true) {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    let body = null
    if (method !== 'GET') {

        body = encode ? JSON.stringify(data) : data
    } else {
        const params = new URLSearchParams(data).toString()
        if (params) {
            url = url + '?' + params
        }
    }


    if (method === 'PUTF') {
        method = "PUT";
        body = data;
        headers = {}
    }

    if (method === 'POSTF') {
        method = "POST";
        body = data;
        headers = {}
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const res = await window.fetch(url, {
        method: method,
        headers,
        body: body,
    })

    const json = await res.json()

    if (!res.ok) {
        if (json.message) {
            throw new Error(json.message)
        } else {
            if (Array.isArray(json)) {
                throw new Error(json.map((e) => e.message || 'Error').join('. '))
            }
            throw new Error('Ocurrió un error')
        }
    }

    return json
}

export function get(url, token = null, queryParams = {}) {
    return request('GET', url, token, queryParams, false)
}

export function post(url, data, encode = true, token = null) {
    return request('POST', url, token, data, encode)
}

export function postForF(url, data, encode = true, token = null) {
    return request('POSTF', url, token, data, encode)
}


export function putForF(url, data, encode = true, token = null) {
    return request('PUTF', url, token, data, encode)
}


export function deleteRequest(url, data, encode = true, token = null) {
    return request('DELETE', url, token, data, encode)
}

export function put(url, data, encode = true, token) {
    return request('PUT', url, token, data, encode)
}