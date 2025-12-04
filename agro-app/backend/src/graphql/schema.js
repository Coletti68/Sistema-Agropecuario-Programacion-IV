const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Tipos principales
  type Usuario {
    usuarioid: ID!
    nombre: String!
    email: String!
    rol: Rol
    cultivos: [UsuarioCultivo]
    solicitudes: [Solicitud]
  }

  type Rol {
    rolid: ID!
    nombre: String!
  }

  type Cultivo {
    cultivoid: ID!
    nombre: String!
    descripcion: String
  }

  type UsuarioCultivo {
    usuariocultivoid: ID!
    cultivo: Cultivo
    latitud: Float
    longitud: Float
    fechasiembra: String
  }

  type Insumo {
    insumoid: ID!
    nombre: String!
    descripcion: String
    precio: Float!
    stock: Int
    proveedor: Proveedor
  }

  type Proveedor {
    proveedorid: ID!
    nombre: String!
    contacto: String
    telefono: String
    email: String
  }

  type Solicitud {
    solicitudid: ID!
    usuario: Usuario
    fechasolicitud: String
    detalles: [SolicitudDetalle]
    pagos: [Pago]
  }

  type SolicitudDetalle {
    solicituddetalleid: ID!
    insumo: Insumo
    cantidad: Int!
    preciounitario: Float!
  }

  type Pago {
    pagoid: ID!
    monto: Float!
    metodo_pago: String
    estado_pago: String
  }

  # Inputs para Mutations
  input DetalleInput {
    insumoid: ID!
    cantidad: Int!
    preciounitario: Float!
  }

  # Queries
  type Query {
    usuarios: [Usuario]
    insumos(proveedorId: ID): [Insumo]
    solicitudes(usuarioId: ID): [Solicitud]
  }

  # Mutations
  type Mutation {
    crearSolicitud(usuarioId: ID!, detalles: [DetalleInput]!): Solicitud
    registrarPago(solicitudId: ID!, monto: Float!, metodo_pago: String): Pago
  }
`;

module.exports = typeDefs;