import { Layout } from "@/components/layouts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import { useRouter } from "next/router";

export const EntryPage = () => {
  const router = useRouter();

  console.log(router.query.id);

  return (
    <Layout title="...">
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title="Entry:" subheader="Created ... minutes ago" />

            <CardContent>
              <TextField
                placeholder="..."
                fullWidth
                autoFocus
                multiline
                label="Entry"
                sx={{ mt: 2, mb: 1 }}
              />

              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup></RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button startIcon={<SaveIcon />} variant="contained" sx={{}}>
                Save Changes
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default EntryPage;
