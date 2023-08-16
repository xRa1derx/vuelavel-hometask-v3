const debounce = (fn: any, delay: any) => {
    let timeout: any

    return (...args: any) => {
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

export default debounce