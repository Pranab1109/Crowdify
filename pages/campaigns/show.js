import React , {Component} from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card,Grid,Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from '../../routes'

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address)

        const summary = await campaign.methods.getSummary().call();

        return {
            address : props.query.address,
            minimumContribution : summary[0],
            balance : summary[1],
            requestsCount : summary[2],
            approversCount : summary[3],
            manager : summary[4],
        }
    }

    renderCards () {

        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;
        
        const items = [
            {
                header : manager, 
                meta : 'Address of Manager',
                description : 'The manager created this campaign and can create requests to withdraw money.',
                style: { overflowWrap:'break-word' },
                color : 'red'
            },
            {
                header : minimumContribution, 
                meta : 'Minimum Contribution (wei)',
                description : 'You must contribute atleast this much amount of wei to become a contributor.',
                style: { overflowWrap:'break-word' },
                color : 'olive'
            },
            {
                header : requestsCount, 
                meta : 'Number of Requests.',
                description : 'A request tries to withdraw money from the contract. Request must be approved by approvers.',
                style: { overflowWrap:'break-word' },
                color : 'teal'
            },
            {
                header : approversCount, 
                meta : 'Number of Approvers.',
                description : 'Number of people who have already donated to this campaign.',
                style: { overflowWrap:'break-word' },
                color : 'violet'
            },
            {
                header : web3.utils.fromWei(balance,'ether'), 
                meta : 'Campaign Balance (ether).',
                description : 'Amount of money this campaign has left to spend.',
                style: { overflowWrap:'break-word' },
                color : 'orange'
            },
        ]
        return <Card.Group items = {items} />
    }
    
    render() {
        return (
        <Layout>
            <h3>Campaign Show</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width = {11}>
                            {this.renderCards()}
                        
                    </Grid.Column>

                    <Grid.Column width = {5}>
                        <ContributeForm address = {this.props.address}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a href="">
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
        )
    }
}

export default CampaignShow