import { Paper, Typography, Box, TextField, Button } from "@mui/material"
import { FormEvent } from "react"
import { useActivities } from "../../../lib/hooks/useActivities"

type Props = {
    activity?: Activity
    closeForm: () => void
}

export default function ActivityForm({ activity, closeForm }: Props) {

    const { updateActivity, createActivity } = useActivities()

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
            closeForm()
        } else { // Creating a brand new activity
            await createActivity.mutateAsync(data as unknown as Activity)
            closeForm()
        }
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
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
                    <Button onClick={closeForm} color='inherit' variant="outlined">Cancel</Button>
                </Box>
            </Box>
        </Paper>
    )
}