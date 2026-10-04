const API_URL = 'http://localhost:3000/api'

type FetchReturn<T> = {
    success: boolean;
    response?: T,
    error?: string
}

export const get = async <T>(route: string): Promise<FetchReturn<T>> => {
    try {
        const response = await fetch(API_URL + route)

        const result = await response.json()

        return {
            success: true,
            response: result
        }
    } catch (e) {
        console.error(e)
        return {
            success: false,
            error: 'An unexpected error happened'
        }
    }
}

export const post = async <T>(route: string, body: T): Promise<FetchReturn<T>> => {
    try {
        const response = await fetch(API_URL + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (response.status === 201) {
            return {
                success: true
            }
        }

        return {
            success: false,
            error: response.statusText
        }
    } catch (e) {
        console.error(e)
        return {
            success: false,
            error: 'An unexpected error happened'
        }
    }
}