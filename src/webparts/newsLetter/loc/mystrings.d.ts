declare interface INewsLetterWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;

  ButtonCancel: string;
  ButtonSave: string;
  NewsLetterTitle: string;
  UserNameField: string;
}

declare module "NewsLetterWebPartStrings" {
  const strings: INewsLetterWebPartStrings;
  export = strings;
}
