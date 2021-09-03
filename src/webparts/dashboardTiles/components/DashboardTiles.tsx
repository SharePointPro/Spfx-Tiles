import * as React from 'react';
import styles from './DashboardTiles.module.scss';
import { IDashboardTilesProps } from './IDashboardTilesProps';
import { Button, Card, Row } from 'react-bootstrap';
import Tile from './Tile';
import {
  faTasks,
  faAddressCard,
  faFolderOpen,
  faPhoneSquareAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import ListService from '../../../services/ListService';

interface IState {
}

export default class DashboardTiles extends React.Component<IDashboardTilesProps, IState> {

  private _listService: ListService;

  constructor(props) {
    super(props);
    this._listService = new ListService(props.context, props.sp);

   
    this.renderTiles = this.renderTiles.bind(this);

  }

  public componentWillUnmount() {
  }

  public componentDidMount() {
    console.log("componentDidMount");
  }

  public componentWillMount() {
  }

  public renderTiles () {

    console.log(this.props.properties);

    let tiles = this.props.properties.items.filter(a=> a.Enable === "true").map(item =>
      <Tile
        key={item.Title}
        icon={item.Icon} 
        bgColor={item.Colour}
        title={item.Title}
        number={-1}
        url={item.LinkUrl}
        xs={this.props.properties.smsize}
        md={this.props.properties.mdsize}
        lg={this.props.properties.lgsize}
        openInNewWindow={item.OpenInNewWindow === "true"}
        siteUrl={item.SiteUrl}
        listName={item.ListName}
        viewName={item.ViewName}
        context={this.props.context}
        sp={this.props.sp}
        ></Tile>
    );

    return tiles;
  }


  public render(): React.ReactElement<IDashboardTilesProps> {

    console.log("this.props.properties", this.props.properties);

    if (!this.props.properties?.items?.filter(a=> a.Enable === "true")?.length) {
      return (
        <div>No tiles created. Tiles are added via the configuration page. </div>
      );
    }


    return (


      <Row className={styles.dashboardTiles}>
        {this.renderTiles()}
      </Row>
    );
  }
}
