import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

// New function to introduce delay into our program
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

// Sets the home address for all the conversations
axios.defaults.baseURL = 'http://localhost:5000/api';

// This gets executed everytime before a request is sent. Therefore, every request will have a 1 second delay
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

// Gets the important data from the response, the actual data. Think of this as opening a letter and throwing away
// the envelope
const responseBody = <T> (response : AxiosResponse<T>) => response.data;

// Holds different ways to talk to the server.
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

// This agent is how the program will interact with all the requests
const agent = {
    Activities
}

// This makes the agent available to all other parts of the program
export default agent;