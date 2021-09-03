import * as React from 'react';
import styles from './Tile.module.scss';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { ITileProps } from './ITileProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { isStrictNullChecksEnabled } from 'tslint';
import * as fontLibrary from '@fortawesome/free-solid-svg-icons';
import ListService from '../../../services/ListService';

export default class Tile extends React.Component<ITileProps, { number: number }> {

    private _listService: ListService;


    constructor(props) {
        super(props);

        this.state = {
            number: -1
        };

        this._listService = new ListService(props.context, props.sp);
        this.onClick = this.onClick.bind(this);
    }

    public componentDidMount() {
        const loadNumber = async () => {
            if (this.props.listName && this.props.viewName) {

                let items = await this._listService.getListViewData(this.props.listName,
                    this.props.viewName,
                    this.props.siteUrl);

                this.setState({ number: items.length });
            }

        };

        loadNumber();
    }


    public onClick(): void {
        if (this.props.url) {
            if (this.props.openInNewWindow) {
                window.open(this.props.url, "_blank");
            }
            else {
                window.location.href = this.props.url;
            }
        }
    }

    public renderBody() {
        //if tile has subtitle render differently
        if (this.props.subTitle) {
            return (<div className={`${styles.numberText} ${styles.subtitleTile}`}>
                <div className={styles.subTitle}>
                    {this.props.subTitle}
                </div>
                <div className={styles.tileValue}>
                    {this.state.number < 0 ?
                        ""
                        :
                        this.state.number
                    }
                </div>
            </div>);
        } else {
            return (
                <div className={styles.numberText}>
                    {this.state.number < 0 ?
                        ""
                        :
                        this.state.number
                    }
                </div>);
        }
    }

    public render(): React.ReactElement {
        return (
            <Col xs={this.props.xs} md={this.props.md} lg={this.props.lg} className={styles.tileWrapper} >
                <Card style={{ width: '100%', backgroundColor: this.props.bgColor }} onClick={this.onClick}  >
                    <Card.Body className={styles.card}>
                        <div className={styles.cardTitle}>
                            <span className={styles.cardTitleText}>
                                {this.props.title}
                            </span>
                            { this.props.icon && <FontAwesomeIcon icon={fontLibrary[this.props.icon]} className={styles.titleIcon} /> }
                        </div>


                        {this.props.children ? this.props.children : this.renderBody()}

                    </Card.Body>
                </Card>
            </Col>
        );
    }
}
