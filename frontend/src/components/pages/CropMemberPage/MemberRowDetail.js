import React from "react";
import Paper from "@material-ui/core/Paper";
import {
    Grid,
    Table,
    TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";

export const MemberRowDetail = ({ row }) => (
    <Paper>
        <Grid
            rows={row.characters}
            columns={[
                { name: "name", title: "角色名" },
                { name: "esi_id", title: "ESI ID" },
                { name: "add_on", title: "注册于" },
                { name: "action", title: "action" }
            ]}
        >
            <Table />
            <TableHeaderRow />
        </Grid>
    </Paper>
);
