const resolvers = {
  Query: {
    usuarios: () => [
      { usuarioid: 1, nombre: "Juan Pérez", email: "juan@example.com" },
      { usuarioid: 2, nombre: "Ana López", email: "ana@example.com" }
    ],
    insumos: (_, { proveedorId }) => [
      { insumoid: 1, nombre: "Fertilizante A", precio: 1200.50, stock: 50 },
      { insumoid: 2, nombre: "Herbicida B", precio: 850.00, stock: 30 }
    ],
    solicitudes: (_, { usuarioId }) => [
      {
        solicitudid: 1,
        fechasolicitud: "2025-10-21",
        detalles: [
          { solicituddetalleid: 1, cantidad: 10, preciounitario: 1200.50 }
        ]
      }
    ]
  },
  Mutation: {
    crearSolicitud: (_, { usuarioId, detalles }) => ({
      solicitudid: 99,
      usuario: { usuarioid: usuarioId, nombre: "Mock User" },
      detalles
    }),
    registrarPago: (_, { solicitudId, monto, metodo_pago }) => ({
      pagoid: 101,
      monto,
      metodo_pago,
      estado_pago: "completado"
    })
  }
};

module.exports = resolvers;