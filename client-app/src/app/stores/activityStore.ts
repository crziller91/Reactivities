import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity";
import agent from "../API/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<String, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    // Returns an array of activities that are sorted by date
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            // Using the agent here to call the axios request, enabling type safety and organization
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                // Split out the date string. This removes the time stamp and keeps the date
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(true);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    selectActivity = (id: string) => {
        // So this a represents an activity object and find method is going to call this predicate once for each element of the array
        // in ascending order until it finds one where the predicate returns true.
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    // If the user is creating an activity, they do not need an id to pass in therefore we will make it optional
    openForm = (id?: string) => {
        // If we have an id, then set it as the selected activity. If not, set the activity to undefined
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.setEditMode(true);
    }

    closeForm = () => {
        this.setEditMode(false);
    }

    // Used to create a brand new activity
    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        // Create a new id for the activity
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.setEditMode(false);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.setEditMode(false);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // Using a map to delete the activity from the specified id
                this.activityRegistry.delete(id)
                // Optional if the user is selecting the activity that is being deleted.
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

}