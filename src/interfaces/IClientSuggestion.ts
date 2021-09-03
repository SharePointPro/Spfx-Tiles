import { NoSubstitutionTemplateLiteral } from "typescript";

export interface IClientSuggestion {
    id: number;

    name: string;

    buttons: IClientButton[];

}

export interface IClientButton {

    clientName: string;

    buttonName: string;

    id: number;
}

