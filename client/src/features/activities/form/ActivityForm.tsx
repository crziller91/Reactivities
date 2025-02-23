import { Paper, Typography, Box, TextField, Button } from "@mui/material"
import { FormEvent } from "react"
import { useActivities } from "../../../lib/hooks/useActivities"
import { Link, useNavigate, useParams } from "react-router"

export default function ActivityForm() {

    const { id } = useParams()
    const { updateActivity, createActivity, activity } = useActivities(id)
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value;
        })

        // Check to make sure we have an activity before calling the submit function
        if (activity) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity)
            navigate(`/activities/${activity.id}`)
        } else { // Creating a brand new activity
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`)
                }
            })
        }
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary" sx={{ pb: 1 }}>
                {activity ? 'Editing Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name='title' label='Title' defaultValue={activity?.title} />
                <TextField name='description' label='Description' defaultValue={activity?.description} multiline rows={3} />
                <TextField name='category' label='Category' defaultValue={activity?.category} />
                <TextField
                    name='date'
                    label='Date'
                    type="date"
                    defaultValue={activity?.date
                        ? new Date(activity.date).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]
                    }
                />
                <TextField name='city' label='City' defaultValue={activity?.city} />
                <TextField name='venue' label='Venue' defaultValue={activity?.venue} />
                <Box display='flex' justifyContent='end' gap={1}>
                    <Button loading={updateActivity.isPending || createActivity.isPending}
                        type="submit"
                        color='success'
                        variant="outlined"
                    >Submit</Button>
                    <Button component={Link} to={activity ? `/activities/${id}` : '/activities'} color='inherit' variant="outlined">Cancel</Button>
                </Box>
            </Box>
        </Paper>
    )
}