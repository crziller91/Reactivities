import { Backdrop, CircularProgress } from "@mui/material";

type Props = {
    loading: boolean
}

export default function LoadingPage({ loading }: Props) {
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}