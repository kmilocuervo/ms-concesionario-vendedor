import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MsqlDataSource} from '../datasources';
import {UsuarioVendedor, UsuarioVendedorRelations} from '../models';

export class UsuarioVendedorRepository extends DefaultCrudRepository<
  UsuarioVendedor,
  typeof UsuarioVendedor.prototype.id,
  UsuarioVendedorRelations
> {
  constructor(
    @inject('datasources.MSQL') dataSource: MsqlDataSource,
  ) {
    super(UsuarioVendedor, dataSource);
  }
}
