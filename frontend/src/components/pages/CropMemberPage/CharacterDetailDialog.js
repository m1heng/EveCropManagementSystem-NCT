import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import blue from "@material-ui/core/colors/blue";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { esiProvider } from "providers/esiProvider";
import {
    FilteringState,
    IntegratedFiltering,
    SortingState,
    IntegratedSorting,
    DataTypeProvider,
    PagingState,
    IntegratedPaging
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
    PagingPanel
} from "@devexpress/dx-react-grid-material-ui";

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};
const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
});

const MoneyFormatter = ({ value }) => value.toLocaleString();

const MoneyTypeProvider = props => (
    <DataTypeProvider formatterComponent={MoneyFormatter} {...props} />
);

const ContractsGrid = ({ contracts }) => {
    return (
        <Grid
            rows={contracts}
            columns={[
                { name: "acceptor_id", title: "接受方" },
                { name: "issuer_id", title: "发起方" },
                { name: "date_accepted", title: "接受时间" },
                { name: "date_issued", title: "发起时间" },
                { name: "start_location_id", title: "发起地点" },
                { name: "availability", title: "范围" },
                { name: "for_corporation", title: "以军团名义" },
                { name: "price", title: "价格" },
                { name: "status", title: "状态" },
                { name: "type", title: "类型" },
                { name: "volume", title: "体积" }
            ]}
            pageSizes={[10, 15, 20, 30]}
        >
            <FilteringState defaultFilters={[]} />
            <SortingState defaultSorting={[]} />
            <PagingState defaultCurrentPage={0} defaultPageSize={10} />
            <IntegratedPaging />
            <IntegratedSorting />
            <IntegratedFiltering />
            <MoneyTypeProvider for={["price"]} />
            {/*<RoleTypeProvider for={["fc", "hr", "director"]} /> */}
            <Table />

            <TableHeaderRow showSortingControls />
            <TableFilterRow />
            <PagingPanel pageSizes={[10, 15, 20, 30]} />
        </Grid>
    );
};

const WalletGrid = ({ wallet }) => {
    return (
        <Grid
            rows={wallet}
            columns={[
                { name: "date", title: "时间" },
                { name: "amount", title: "金额" },
                { name: "balance", title: "余额" },
                { name: "ref_type", title: "类型" },
                { name: "first_party_id", title: "第一人" },
                { name: "second_party_id", title: "第二人" },
                { name: "description", title: "描述" },

                { name: "reason", title: "理由" }
            ]}
            pageSizes={[10, 15, 20, 30]}
        >
            <FilteringState defaultFilters={[]} />
            <SortingState defaultSorting={[]} />
            <PagingState defaultCurrentPage={0} defaultPageSize={10} />
            <IntegratedPaging />
            <IntegratedSorting />
            <IntegratedFiltering />
            <MoneyTypeProvider for={["amount", "balance"]} />
            {/*<RoleTypeProvider for={["fc", "hr", "director"]} /> */}
            <Table
                columnExtensions={[
                    { columnName: "amount", align: "right" },
                    { columnName: "balance", align: "right" }
                ]}
            />

            <TableHeaderRow showSortingControls />
            <TableFilterRow />
            <PagingPanel pageSizes={[10, 15, 20, 30]} />
        </Grid>
    );
};

const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CircularProgress />
            </div>
        </div>
    );
};

class CharacterDetailDialog extends React.Component {
    state = {
        value: 0
    };
    handleClose = () => {
        this.props.onClose();
    };
    handleTabChange = (event, value) => {
        this.setState({ value });
        if (value === 0 && !this.state.contractlist) {
        } else if (value === 1 && !this.state.walletjournal) {
            esiProvider
                .getCharWallet(this.props.char, null, 1)
                .then(async data => {
                    const id_dict = {};
                    data.map(journal => {
                        id_dict[journal.first_party_id] = 0;
                        id_dict[journal.second_party_id] = 0;
                    });
                    const ids = Object.keys(id_dict);
                    const names = await esiProvider.getNamesbyIds(ids);
                    names.map(name => {
                        id_dict[name.id] = name.name;
                    });
                    data.map(journal => {
                        journal.first_party_id =
                            id_dict[journal.first_party_id];
                        journal.second_party_id =
                            id_dict[journal.second_party_id];
                    });
                    this.setState({ walletjournal: data });
                });
        }
    };

    componentDidMount() {
        esiProvider
            .getCharContracts(this.props.char, null, 1)
            .then(async data => {
                const refresh_token_resp = await esiProvider.getAccessToken(
                    this.props.char.esi_refresh_token
                );
                const promises = data.map(async contract => {
                    contract.acceptor_id = await esiProvider.characterIDtoInfo(
                        contract.acceptor_id
                    );
                    contract.issuer_id = await esiProvider.characterIDtoInfo(
                        contract.issuer_id
                    );

                    contract.start_location_id = await esiProvider.locationIDtoName(
                        contract.start_location_id,
                        refresh_token_resp
                    );
                    return contract;
                });
                const nb = await Promise.all(promises);
                this.setState({ contractlist: nb });
            });
    }

    render() {
        const { classes, onClose, char, ...other } = this.props;
        const { value, contractlist, walletjournal } = this.state;

        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                maxWidth={false}
                {...other}
            >
                <DialogTitle id="simple-dialog-title">{char.name}</DialogTitle>
                <DialogContent>
                    <AppBar position="static">
                        <Tabs value={value} onChange={this.handleTabChange}>
                            <Tab label="合同列表" />
                            <Tab label="钱包信息" />
                            <Tab label="资产列表" />
                            <Tab label="制造列表" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && (
                        <TabContainer>
                            {contractlist ? (
                                <ContractsGrid contracts={contractlist} />
                            ) : (
                                <Loading />
                            )}
                        </TabContainer>
                    )}
                    {value === 1 && (
                        <TabContainer>
                            {walletjournal ? (
                                <WalletGrid wallet={walletjournal} />
                            ) : (
                                <Loading />
                            )}
                        </TabContainer>
                    )}

                    {value === 2 && <TabContainer>22222</TabContainer>}
                    {value === 3 && <TabContainer>22222</TabContainer>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        退出
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CharacterDetailDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func
};

export default withStyles(styles)(CharacterDetailDialog);
