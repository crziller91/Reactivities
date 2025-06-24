import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

// New function to introduce delay into our program
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// Loading indicator
agent.interceptors.request.use(config => {
    store.uiStore.isBusy()
    return config
})

agent.interceptors.response.use(
    async response => {
        await sleep(1000); // Sleep for 1 second
        store.uiStore.isIdle(); // Switch off the loading indicator
        return response;
    },
    async error => {
        await sleep(1000);
        store.uiStore.isIdle();

        // Destruction the status and data from the error response
        const { status, data } = error.response;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modalStateErrors = []
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key])
                        }
                    }
                    throw modalStateErrors.flat() //Flatten it into an array of strings. Arrray of errors
                } else {
                    toast.error(data)
                }
                break;
            case 401:
                toast.error('Unauthorized')
                break;
            case 404:
                router.navigate('/not-found')
                break;
            case 500:
                router.navigate('/server-error', {state: {error: data}})
                break;
            default:
                break;
        }

        return Promise.reject(error)
    }
)

export default agent