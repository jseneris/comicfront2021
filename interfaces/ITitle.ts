import IPublisher from './IPublisher';

export default interface ITitle {
  name: string;
  seoFriendlyName: string;
  publisher: IPublisher;
}
