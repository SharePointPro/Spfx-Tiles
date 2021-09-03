import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneToggle, PropertyPaneSlider }  from '@microsoft/sp-property-pane';
import * as strings from 'DashboardTilesWebPartStrings';
import DashboardTiles from './components/DashboardTiles';
import { IDashboardTilesProps } from './components/IDashboardTilesProps';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sp } from  "@pnp/sp/presets/all";
import { PropertyFieldCustomList, CustomListFieldType } from 'sp-client-custom-fields/lib/PropertyFieldCustomList';

export interface IDashboardTilesWebPartProps {
  description: string;
  items: any[];
}

export default class DashboardTilesWebPart extends BaseClientSideWebPart<IDashboardTilesWebPartProps> {

  public render(): void {

    sp.setup(
      {
        spfxContext: this.context
      }
    );

    const element: React.ReactElement<IDashboardTilesProps> = React.createElement(
      DashboardTiles,
      {
        description: this.properties.description,
        context: this.context,
        sp: sp,
        properties: this.properties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //protected dataVersion: Version = Version.parse('1.0');

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Customize the general settings"
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "Tile Settings",
              groupFields: [
                PropertyFieldCustomList('items', {
                  label: "Items",
                  value: this.properties.items,
                  headerText: "Manage Tiles",
                  fields: [
                    { id: 'Enable', title: 'Enable', required: true, type: CustomListFieldType.boolean },
                    { id: 'Title', title: 'Title', required: true, type: CustomListFieldType.string },
                    { id: 'Icon', title: 'Font Awesome Icon (eg: faTasks)', required: false, type: CustomListFieldType.string },
                    { id: 'SiteUrl', title: 'Site Url (if not this site)', required: false, type: CustomListFieldType.string },
                    { id: 'ListName', title: 'List Name', required: false, type: CustomListFieldType.string },
                    { id: 'ViewName', title: 'View Name', required: false, type: CustomListFieldType.string },
                    { id: 'LinkUrl', title: 'Link Url', required: false, type: CustomListFieldType.string },
                    { id: 'Colour', title: 'Colour', required: true, type: CustomListFieldType.colorMini },
                    { id: 'OpenInNewWindow', title: 'Open In New Window', required: true, type: CustomListFieldType.boolean },

                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  render: this.render.bind(this),
                  disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                  context: this.context,
                  properties: this.properties,
                  key: 'tilesMenuListField'
                })
              ]
            },
            {
              groupName: "Display",
              groupFields: [
                PropertyPaneSlider('lgsize', {
                  label: "Large Screen size of tile",
                  min: 1,
                  max: 12,
                  step: 1,
                }),
                PropertyPaneSlider('mdsize', {
                  label: "Medium Screen size of tile",
                  min: 1,
                  max: 12,
                  step: 1,
                }),
                PropertyPaneSlider('smsize', {
                  label: "Small Screen size of tile",
                  min: 1,
                  max: 12,
                  step: 1,
                }),

              ]
            }
          ]
        }

      ]
    };
  }
}
