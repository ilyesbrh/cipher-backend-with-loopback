import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'postegressConnector',
//   connector: 'postgresql',
//   host: 'ec2-176-34-114-78.eu-west-1.compute.amazonaws.com',
//   port: 5432,
//   user: 'ejzfodalsbvqqt',
//   password: '8c7b7af3ab0c6804d3bbe8a90eeecdab6e171cdc563b771621da423b57a74841',
//   database: 'dcgnan9dh22310'
// };

const config = {
  name: 'postegressConnector',
  connector: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'cipherdb'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostegressConnectorDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postegressConnector';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postegressConnector', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
