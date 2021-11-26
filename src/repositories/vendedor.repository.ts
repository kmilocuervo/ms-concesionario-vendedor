import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MsqlDataSource} from '../datasources';
import {Vendedor, VendedorRelations, Cliente, UsuarioVendedor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {UsuarioVendedorRepository} from './usuario-vendedor.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly vendedortieneclientes: HasManyRepositoryFactory<Cliente, typeof Vendedor.prototype.id>;

  public readonly vendedortieneunusuario: HasOneRepositoryFactory<UsuarioVendedor, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.MSQL') dataSource: MsqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('UsuarioVendedorRepository') protected usuarioVendedorRepositoryGetter: Getter<UsuarioVendedorRepository>,
  ) {
    super(Vendedor, dataSource);
    this.vendedortieneunusuario = this.createHasOneRepositoryFactoryFor('vendedortieneunusuario', usuarioVendedorRepositoryGetter);
    this.registerInclusionResolver('vendedortieneunusuario', this.vendedortieneunusuario.inclusionResolver);
    this.vendedortieneclientes = this.createHasManyRepositoryFactoryFor('vendedortieneclientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('vendedortieneclientes', this.vendedortieneclientes.inclusionResolver);
  }
}
