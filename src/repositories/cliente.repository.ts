import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MsqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Vendedor} from '../models';
import {VendedorRepository} from './vendedor.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly clientepertenecevendedor: BelongsToAccessor<Vendedor, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.MSQL') dataSource: MsqlDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>,
  ) {
    super(Cliente, dataSource);
    this.clientepertenecevendedor = this.createBelongsToAccessorFor('clientepertenecevendedor', vendedorRepositoryGetter,);
    this.registerInclusionResolver('clientepertenecevendedor', this.clientepertenecevendedor.inclusionResolver);
  }
}
